import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function seed() {
  await prisma.currency.createMany({
    data: [
      { id: uuidv4(), currency: 'USD', rate: 1879.63 },
      { id: uuidv4(), currency: 'EUR', rate: 1701.52 },
    ],
  });

  console.log('Currencies created');
}

seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
