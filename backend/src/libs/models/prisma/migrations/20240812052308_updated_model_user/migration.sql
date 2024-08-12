/*
  Warnings:

  - You are about to drop the column `certificate` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "certificate",
ADD COLUMN     "certificates" TEXT[];
