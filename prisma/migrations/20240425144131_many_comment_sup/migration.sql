/*
  Warnings:

  - You are about to drop the column `teaId` on the `Comments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_teaId_fkey`;

-- AlterTable
ALTER TABLE `Comments` DROP COLUMN `teaId`;
