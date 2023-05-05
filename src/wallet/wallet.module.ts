import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [WalletController],
  providers: [WalletService],
  imports: [ConfigModule, HttpModule],
})
export class WalletModule {}
