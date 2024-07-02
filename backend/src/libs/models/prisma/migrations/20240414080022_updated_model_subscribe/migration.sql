/*
  Warnings:

  - You are about to drop the column `coaches` on the `subscribers` table. All the data in the column will be lost.
  - You are about to drop the column `notices` on the `subscribers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subscribers" DROP COLUMN "coaches",
DROP COLUMN "notices";

-- CreateTable
CREATE TABLE "coaches_subscribe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subscribeId" TEXT NOT NULL,

    CONSTRAINT "coaches_subscribe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notices_subscribe" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "trainingType" TEXT NOT NULL,
    "coachName" TEXT NOT NULL,
    "subscribeId" TEXT NOT NULL,

    CONSTRAINT "notices_subscribe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "coaches_subscribe" ADD CONSTRAINT "coaches_subscribe_subscribeId_fkey" FOREIGN KEY ("subscribeId") REFERENCES "subscribers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notices_subscribe" ADD CONSTRAINT "notices_subscribe_subscribeId_fkey" FOREIGN KEY ("subscribeId") REFERENCES "subscribers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
