-- CreateTable
CREATE TABLE "file_storage" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "original_name" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "file_storage_pkey" PRIMARY KEY ("id")
);
