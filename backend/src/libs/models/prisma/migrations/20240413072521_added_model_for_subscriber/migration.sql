-- CreateTable
CREATE TABLE "subscribers" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "coaches" TEXT[],
    "notices" TEXT[],

    CONSTRAINT "subscribers_pkey" PRIMARY KEY ("id")
);
