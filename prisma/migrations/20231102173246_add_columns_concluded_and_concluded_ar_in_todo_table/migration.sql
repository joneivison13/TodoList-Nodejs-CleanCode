-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "concluded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "concluded_at" TIMESTAMP(3);
