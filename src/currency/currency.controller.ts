import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { UpdateCurrencyDto } from './dto';
import { Currency } from '@prisma/client';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  async findAll(): Promise<Currency[]> {
    const currencies = await this.currencyService.findAll();
    return currencies;
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Currency> {
    return await this.currencyService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCurrencyDto: UpdateCurrencyDto,
  ) {
    return await this.currencyService.update(id, updateCurrencyDto);
  }
}
