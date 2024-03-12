-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_event_id_fkey`;

-- AlterTable
ALTER TABLE `comment` MODIFY `event_id` VARCHAR(191) NOT NULL,
    MODIFY `stars` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
