/*
  Warnings:

  - Added the required column `ingredientId` to the `HasIngredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teaId` to the `HasIngredients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `HasIngredients` ADD COLUMN `ingredientId` INTEGER NOT NULL,
    ADD COLUMN `teaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `HasIngredients` ADD CONSTRAINT `HasIngredients_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `Ingredient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HasIngredients` ADD CONSTRAINT `HasIngredients_teaId_fkey` FOREIGN KEY (`teaId`) REFERENCES `Tea`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
