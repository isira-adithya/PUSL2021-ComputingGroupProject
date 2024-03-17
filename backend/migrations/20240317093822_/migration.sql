/*
  Warnings:

  - You are about to drop the column `notifications_sent` on the `event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `notifications_sent`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `last_notification_check` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);
