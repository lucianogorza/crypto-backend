import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto, FindAllWalletDto, UpdateWalletDto } from './dto';
import { Wallet } from '@prisma/client';
import { WalletEntity } from './entities/wallet.entity';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async create(
    @Body() createWalletDto: CreateWalletDto,
  ): Promise<WalletEntity> {
    const wallet = await this.walletService.create(createWalletDto);

    return wallet;
  }

  @Get()
  async findAll(
    @Query() findAllDto: FindAllWalletDto,
  ): Promise<WalletEntity[]> {
    const wallets = await this.walletService.findAll(findAllDto);
    return wallets;
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<WalletEntity> {
    return await this.walletService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ): Promise<Wallet> {
    return await this.walletService.update(id, updateWalletDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<Wallet> {
    return await this.walletService.remove(id);
  }
}
