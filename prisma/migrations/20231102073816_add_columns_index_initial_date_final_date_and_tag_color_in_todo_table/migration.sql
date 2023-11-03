/*
  Warnings:

  - Added the required column `index` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag_color` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "final_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "index" INTEGER NOT NULL,
ADD COLUMN     "initial_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tag_color" TEXT NOT NULL;
