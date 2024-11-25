/*
  Warnings:

  - A unique constraint covering the columns `[teaId,ingredientId]` on the table `HasIngredients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `HasIngredients_teaId_ingredientId_key` ON `HasIngredients`(`teaId`, `ingredientId`);
