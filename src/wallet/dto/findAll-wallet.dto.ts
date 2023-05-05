import { Prisma } from '@prisma/client';
import { IsOptional } from 'class-validator';

export class FindAllWalletDto {
  @IsOptional()
  orderBy?: Prisma.WalletOrderByWithRelationInput;
}
