/*
  Warnings:

  - Added the required column `file_name` to the `file_storage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "file_storage" ADD COLUMN     "file_name" TEXT NOT NULL;
