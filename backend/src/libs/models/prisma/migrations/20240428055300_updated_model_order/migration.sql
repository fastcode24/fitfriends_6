/*
  Warnings:

  - Added the required column `coach_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "coach_id" TEXT NOT NULL;
