-- CreateTable
CREATE TABLE "SubscriptionPackage" (
    "id" TEXT NOT NULL,
    "PackageName" TEXT NOT NULL,
    "MaxFolders" INTEGER NOT NULL,
    "MaxNestingFolder" INTEGER NOT NULL,
    "AllowedFileTypes" TEXT[],
    "MaxFileSizeMB" INTEGER NOT NULL,
    "TotalFileLimit" INTEGER NOT NULL,
    "FilePerFolder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscriptionPackage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPackage_PackageName_key" ON "SubscriptionPackage"("PackageName");
