import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCurrencyDto } from './dto';
import { Currency } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CurrencyService {
  constructor(private readonly database: DatabaseService) {}

  findAll(): Promise<Currency[]> {
    return this.database.currency.findMany({ orderBy: { currency: 'asc' } });
  }

  async findOne(id: string): Promise<Currency> {
    const currency = await this.database.currency.findUnique({ where: { id } });

    if (!currency)
      throw new NotFoundException(`Currency with id '${id}' not found`);

    return currency;
  }

  async update(id: string, updateCurrencyDto: UpdateCurrencyDto) {
    await this.findOne(id);

    const updatedCurrency = await this.database.currency.update({
      data: updateCurrencyDto,
      where: { id },
    });

    return updatedCurrency;
  }
}
