/*
  Warnings:

  - You are about to drop the column `is_email_notifications_enabled` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `is_email_notifications_enabled`,
    MODIFY `notification_preference` VARCHAR(191) NOT NULL DEFAULT 'NONE';
