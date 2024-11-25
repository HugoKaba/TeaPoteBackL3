/*
  Warnings:

  - You are about to drop the column `ingredientId` on the `HasIngredients` table. All the data in the column will be lost.
  - You are about to drop the column `teaId` on the `HasIngredients` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `HasIngredients` DROP FOREIGN KEY `HasIngredients_ingredientId_fkey`;

-- DropForeignKey
ALTER TABLE `HasIngredients` DROP FOREIGN KEY `HasIngredients_teaId_fkey`;

-- AlterTable
ALTER TABLE `HasIngredients` DROP COLUMN `ingredientId`,
    DROP COLUMN `teaId`;
