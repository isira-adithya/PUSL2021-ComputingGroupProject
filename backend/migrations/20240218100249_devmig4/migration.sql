-- AlterTable
ALTER TABLE `commentary` MODIFY `comment` VARCHAR(512) NULL;

-- AlterTable
ALTER TABLE `event` MODIFY `description` VARCHAR(8096) NULL,
    MODIFY `images` VARCHAR(2048) NULL;

-- AlterTable
ALTER TABLE `notification` MODIFY `content` VARCHAR(512) NULL;

-- AlterTable
ALTER TABLE `ticket` MODIFY `description` VARCHAR(512) NOT NULL;
