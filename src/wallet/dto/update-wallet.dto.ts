import { IsBoolean, IsEmpty } from 'class-validator';

export class UpdateWalletDto {
  @IsBoolean()
  isFavorite: boolean;

  @IsEmpty()
  address?: never;
}
