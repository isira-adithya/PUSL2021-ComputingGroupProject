/*
  Warnings:

  - You are about to drop the column `user_id` on the `event` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_user_id_fkey`;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `user_id`,
    ADD COLUMN `owner_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
