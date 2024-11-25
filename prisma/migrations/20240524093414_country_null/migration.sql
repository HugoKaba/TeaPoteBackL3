-- DropForeignKey
ALTER TABLE `Tea` DROP FOREIGN KEY `Tea_countryId_fkey`;

-- AddForeignKey
ALTER TABLE `Tea` ADD CONSTRAINT `Tea_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
