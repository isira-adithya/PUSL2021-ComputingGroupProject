/*
  Warnings:

  - You are about to drop the column `date` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `event_category` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `event_description` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `event_name` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_prices` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `event` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_first_name_key` ON `user`;

-- DropIndex
DROP INDEX `User_last_name_key` ON `user`;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `date`,
    DROP COLUMN `event_category`,
    DROP COLUMN `event_description`,
    DROP COLUMN `event_name`,
    DROP COLUMN `image`,
    DROP COLUMN `ticket_prices`,
    DROP COLUMN `time`,
    ADD COLUMN `category` VARCHAR(191) NULL,
    ADD COLUMN `date_time` DATETIME(3) NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `images` VARCHAR(191) NULL,
    ADD COLUMN `location_geocoordinates` VARCHAR(191) NULL DEFAULT '0,0',
    ADD COLUMN `name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `addr_geocoordinates` VARCHAR(191) NULL DEFAULT '0,0',
    MODIFY `profile_image` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Ticket` (
    `ticket_id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `event_id` INTEGER NOT NULL,

    PRIMARY KEY (`ticket_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`event_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
