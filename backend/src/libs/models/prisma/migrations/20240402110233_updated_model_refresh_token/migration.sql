/*
  Warnings:

  - The primary key for the `refresh_sessions` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "refresh_sessions" DROP CONSTRAINT "refresh_sessions_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "refresh_sessions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "refresh_sessions_id_seq";
