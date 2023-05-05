import { IsEmpty, IsPositive } from 'class-validator';

export class UpdateCurrencyDto {
  @IsPositive()
  rate: number;

  @IsEmpty()
  currency?: never;
}
