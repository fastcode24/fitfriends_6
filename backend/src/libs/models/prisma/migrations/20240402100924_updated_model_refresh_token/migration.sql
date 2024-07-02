/*
  Warnings:

  - You are about to drop the column `expiresIn` on the `refresh_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `tokenId` on the `refresh_sessions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token_id]` on the table `refresh_sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expires_in` to the `refresh_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token_id` to the `refresh_sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "refresh_sessions_tokenId_key";

-- AlterTable
ALTER TABLE "refresh_sessions" DROP COLUMN "expiresIn",
DROP COLUMN "tokenId",
ADD COLUMN     "expires_in" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "token_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "refresh_sessions_token_id_key" ON "refresh_sessions"("token_id");
