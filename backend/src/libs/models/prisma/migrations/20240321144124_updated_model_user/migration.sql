/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "gender" TEXT NOT NULL,
    "birthday" TIMESTAMP(3),
    "role" TEXT NOT NULL,
    "description" TEXT,
    "metro" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "training_type" TEXT[],
    "training_time" TEXT,
    "calories" INTEGER,
    "calories_per_day" INTEGER,
    "sertificate" TEXT,
    "awards" TEXT,
    "is_ready" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
