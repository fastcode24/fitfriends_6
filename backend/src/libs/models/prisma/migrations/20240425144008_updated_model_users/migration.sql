/*
  Warnings:

  - You are about to drop the column `sertificate` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "sertificate",
ADD COLUMN     "certificate" TEXT;
