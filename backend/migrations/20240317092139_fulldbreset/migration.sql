-- AlterTable
ALTER TABLE `user` ADD COLUMN `is_email_notifications_enabled` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `verification` ADD COLUMN `admin_messages` VARCHAR(191) NULL;
