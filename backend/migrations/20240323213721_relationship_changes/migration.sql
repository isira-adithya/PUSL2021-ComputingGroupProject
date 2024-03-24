-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_event_id_fkey`;

-- AlterTable
ALTER TABLE `ticket` MODIFY `event_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`event_id`) ON DELETE SET NULL ON UPDATE CASCADE;
