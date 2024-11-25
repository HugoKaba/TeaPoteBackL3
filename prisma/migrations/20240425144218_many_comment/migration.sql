/*
  Warnings:

  - Added the required column `teaId` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comments` ADD COLUMN `teaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_teaId_fkey` FOREIGN KEY (`teaId`) REFERENCES `Tea`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
