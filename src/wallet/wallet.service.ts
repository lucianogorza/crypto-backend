import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWalletDto, FindAllWalletDto, UpdateWalletDto } from './dto';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { WalletEntity } from './entities/wallet.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { differenceInYears } from 'date-fns';

@Injectable()
export class WalletService {
  private etherScanApiUrl: string;
  private etherscanApiKey: string;

  constructor(
    private readonly database: DatabaseService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.etherScanApiUrl = configService.get<string>('etherscanApiUrl');
    this.etherscanApiKey = configService.get<string>('etherscanApiKey');
  }

  private getWalletBalance = async (address: string): Promise<number> => {
    const { data } = await this.httpService.axiosRef.get<{ result: number }>(
      `${this.etherScanApiUrl}?module=account&action=balance&address=${address}&apikey=${this.etherscanApiKey}`,
    );
    return data.result / Math.pow(10, 18);
  };

  private getWalletIsOld = async (address: string): Promise<boolean> => {
    const { data } = await this.httpService.axiosRef.get<{
      result: { timestamp: number }[];
    }>(
      `${this.etherScanApiUrl}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=${this.etherscanApiKey}`,
    );

    const isOld = (timestamp: number) => {
      const today = new Date();
      const transactionDay = new Date(timestamp);

      const difference = differenceInYears(today, transactionDay);

      return difference >= 1 ? true : false;
    };

    const timestamp = data?.result?.length
      ? data.result[0].timestamp
      : undefined;

    return timestamp ? isOld(timestamp) : false;
  };

  async create(createWalletDto: CreateWalletDto): Promise<WalletEntity> {
    const id = uuidv4();

    const { address } = createWalletDto;
    const wallet = await this.database.wallet.findFirst({ where: { address } });

    if (wallet)
      throw new BadRequestException(
        `Wallet with address '${address}' already exists`,
      );

    const newWallet = await this.database.wallet.create({
      data: { id, ...createWalletDto },
    });

    const balance = await this.getWalletBalance(address);
    const isOld = await this.getWalletIsOld(address);

    return {
      ...newWallet,
      balance,
      isOld,
    };
  }

  async findAll(findAllDto: FindAllWalletDto): Promise<WalletEntity[]> {
    const { orderBy } = findAllDto;

    const wallets = await this.database.wallet.findMany({ orderBy });

    for (const wallet of wallets as WalletEntity[]) {
      const balance = await this.getWalletBalance(wallet.address);
      wallet.balance = balance;

      const isOld = await this.getWalletIsOld(wallet.address);
      wallet.isOld = isOld;
    }

    return wallets as WalletEntity[];
  }

  async findOne(id: string): Promise<WalletEntity> {
    const wallet = await this.database.wallet.findUnique({ where: { id } });

    if (!wallet)
      throw new NotFoundException(`Wallet with id '${id}' not found`);

    const balance = await this.getWalletBalance(wallet.address);
    const isOld = await this.getWalletIsOld(wallet.address);

    return { ...wallet, balance, isOld };
  }

  async update(id: string, updateWalletDto: UpdateWalletDto) {
    await this.findOne(id);

    const updatedWallet = await this.database.wallet.update({
      data: updateWalletDto,
      where: { id },
    });

    return updatedWallet;
  }

  async remove(id: string) {
    const wallet = await this.findOne(id);
    await this.database.wallet.delete({ where: { id } });
    return wallet;
  }
}
