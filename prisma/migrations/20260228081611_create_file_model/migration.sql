-- CreateEnum
CREATE TYPE "FileTypes" AS ENUM ('image', 'video', 'audio', 'pdf');

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "originalFileName" TEXT NOT NULL,
    "renameFileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "uploadFilePath" INTEGER NOT NULL,
    "uploadFileTypes" "FileTypes" NOT NULL,
    "userId" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
