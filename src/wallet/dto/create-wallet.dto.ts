import { IsEthereumAddress, IsNotEmpty } from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty()
  @IsEthereumAddress()
  address: string;
}
