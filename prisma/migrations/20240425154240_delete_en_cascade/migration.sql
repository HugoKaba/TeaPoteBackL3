-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `CartItem_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_teaId_fkey`;

-- DropForeignKey
ALTER TABLE `HasIngredients` DROP FOREIGN KEY `HasIngredients_ingredientId_fkey`;

-- DropForeignKey
ALTER TABLE `HasIngredients` DROP FOREIGN KEY `HasIngredients_teaId_fkey`;

-- DropForeignKey
ALTER TABLE `HasMoment` DROP FOREIGN KEY `HasMoment_momentId_fkey`;

-- DropForeignKey
ALTER TABLE `HasMoment` DROP FOREIGN KEY `HasMoment_teaId_fkey`;

-- DropForeignKey
ALTER TABLE `HasTypes` DROP FOREIGN KEY `HasTypes_teaId_fkey`;

-- DropForeignKey
ALTER TABLE `HasTypes` DROP FOREIGN KEY `HasTypes_teaTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_teaId_fkey`;

-- DropForeignKey
ALTER TABLE `PreviousOrder` DROP FOREIGN KEY `PreviousOrder_productId_fkey`;

-- DropForeignKey
ALTER TABLE `SharedCard` DROP FOREIGN KEY `SharedCard_teaId_fkey`;

-- DropForeignKey
ALTER TABLE `Tea` DROP FOREIGN KEY `Tea_countryId_fkey`;

-- AddForeignKey
ALTER TABLE `Tea` ADD CONSTRAINT `Tea_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HasMoment` ADD CONSTRAINT `HasMoment_momentId_fkey` FOREIGN KEY (`momentId`) REFERENCES `Moment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HasMoment` ADD CONSTRAINT `HasMoment_teaId_fkey` FOREIGN KEY (`teaId`) REFERENCES `Tea`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_teaId_fkey` FOREIGN KEY (`teaId`) REFERENCES `Tea`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SharedCard` ADD CONSTRAINT `SharedCard_teaId_fkey` FOREIGN KEY (`teaId`) REFERENCES `Tea`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PreviousOrder` ADD CONSTRAINT `PreviousOrder_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_teaId_fkey` FOREIGN KEY (`teaId`) REFERENCES `Tea`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HasTypes` ADD CONSTRAINT `HasTypes_teaTypeId_fkey` FOREIGN KEY (`teaTypeId`) REFERENCES `TeaType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HasTypes` ADD CONSTRAINT `HasTypes_teaId_fkey` FOREIGN KEY (`teaId`) REFERENCES `Tea`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HasIngredients` ADD CONSTRAINT `HasIngredients_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `Ingredient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HasIngredients` ADD CONSTRAINT `HasIngredients_teaId_fkey` FOREIGN KEY (`teaId`) REFERENCES `Tea`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
