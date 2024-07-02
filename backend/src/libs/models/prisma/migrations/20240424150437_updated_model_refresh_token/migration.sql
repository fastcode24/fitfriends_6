/*
  Warnings:

  - You are about to drop the column `created_at` on the `refresh_sessions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "refresh_sessions" DROP COLUMN "created_at";
