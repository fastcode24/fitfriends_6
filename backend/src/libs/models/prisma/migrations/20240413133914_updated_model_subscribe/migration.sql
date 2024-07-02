/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `subscribers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "subscribers_user_id_key" ON "subscribers"("user_id");
