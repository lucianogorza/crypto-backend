import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationsSchema } from './config/joi.validation';
import { WalletModule } from './wallet/wallet.module';
import { DatabaseModule } from './database/database.module';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationsSchema,
    }),
    DatabaseModule,
    WalletModule,
    CurrencyModule,
  ],
})
export class AppModule {}
