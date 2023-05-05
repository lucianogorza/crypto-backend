import { Wallet } from '@prisma/client';

export interface WalletEntity extends Wallet {
  balance: number;
  isOld: boolean;
}
