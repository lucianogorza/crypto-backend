-- CreateTable
CREATE TABLE "Wallet" (
    "id" UUID NOT NULL,
    "address" VARCHAR NOT NULL,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" UUID NOT NULL,
    "currency" VARCHAR NOT NULL,
    "rate" DECIMAL NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_address_key" ON "Wallet"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_currency_key" ON "Currency"("currency");
