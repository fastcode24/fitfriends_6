/*
  Warnings:

  - You are about to drop the `coaches_subscribe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notices_subscribe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscribers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "coaches_subscribe" DROP CONSTRAINT "coaches_subscribe_subscribeId_fkey";

-- DropForeignKey
ALTER TABLE "notices_subscribe" DROP CONSTRAINT "notices_subscribe_subscribeId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "subscribers" TEXT[];

-- DropTable
DROP TABLE "coaches_subscribe";

-- DropTable
DROP TABLE "notices_subscribe";

-- DropTable
DROP TABLE "subscribers";
