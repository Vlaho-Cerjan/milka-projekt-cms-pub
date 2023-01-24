-- CreateTable
CREATE TABLE `admins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NULL,
    `last_name` VARCHAR(255) NULL,
    `title` VARCHAR(255) NULL,
    `admin_title` VARCHAR(255) NULL,
    `admin_type` VARCHAR(255) NULL,
    `create_date` VARCHAR(255) NULL,
    `update_date` VARCHAR(255) NULL,
    `delete_date` VARCHAR(255) NULL,
    `img_src` MEDIUMTEXT NULL,
    `alt` MEDIUMTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` MEDIUMTEXT NOT NULL,
    `img_src` MEDIUMTEXT NULL,
    `categories` INTEGER NULL,
    `tags` INTEGER NULL,
    `slug` VARCHAR(255) NULL,
    `create_date` VARCHAR(255) NULL,
    `update_date` VARCHAR(255) NULL,
    `delete_date` VARCHAR(255) NULL,
    `alt` MEDIUMTEXT NULL,
    `short_description` MEDIUMTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` MEDIUMTEXT NULL,
    `create_date` VARCHAR(255) NULL,
    `update_date` VARCHAR(255) NULL,
    `delete_date` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `company_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `url` MEDIUMTEXT NULL,
    `working_hours` VARCHAR(255) NOT NULL,
    `address` MEDIUMTEXT NULL,
    `address_short` VARCHAR(255) NOT NULL,
    `address_url` MEDIUMTEXT NULL,
    `phone` VARCHAR(255) NULL,
    `coords` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `aditional_names` VARCHAR(255) NULL,
    `last_name` VARCHAR(255) NULL,
    `title` VARCHAR(255) NULL,
    `bio` MEDIUMTEXT NULL,
    `email` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NULL,
    `create_date` VARCHAR(255) NULL,
    `update_date` VARCHAR(255) NULL,
    `delete_date` VARCHAR(255) NULL,
    `img_src` MEDIUMTEXT NULL,
    `slug` VARCHAR(255) NULL,
    `alt` MEDIUMTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `aditional_names` VARCHAR(255) NULL,
    `last_name` VARCHAR(255) NULL,
    `title` VARCHAR(255) NULL,
    `bio` MEDIUMTEXT NULL,
    `email` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NULL,
    `employe_title` VARCHAR(255) NULL,
    `create_date` VARCHAR(255) NULL,
    `update_date` VARCHAR(255) NULL,
    `delete_date` VARCHAR(255) NULL,
    `img_src` MEDIUMTEXT NULL,
    `slug` VARCHAR(255) NULL,
    `alt` MEDIUMTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faq` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` MEDIUMTEXT NOT NULL,
    `content` MEDIUMTEXT NOT NULL,
    `faq_order` INTEGER NOT NULL,
    `create_date` VARCHAR(255) NULL,
    `update_date` VARCHAR(255) NULL,
    `delete_date` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` MEDIUMTEXT NULL,
    `doctors_id` VARCHAR(255) NULL,
    `create_date` VARCHAR(255) NULL,
    `update_date` VARCHAR(255) NULL,
    `delete_date` VARCHAR(255) NULL,
    `img_src` MEDIUMTEXT NULL,
    `slug` VARCHAR(255) NULL,
    `alt` MEDIUMTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `services_list` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `value` DOUBLE NULL,
    `discount` DOUBLE NULL,
    `usluga_id` INTEGER NULL,
    `pod_usluga_id` INTEGER NULL,
    `description` MEDIUMTEXT NULL,
    `value_range` VARCHAR(255) NULL,
    `services_order` INTEGER NULL,
    `highlighted` TINYINT NOT NULL DEFAULT 0,
    `create_date` VARCHAR(255) NULL,
    `update_date` VARCHAR(255) NULL,
    `delete_date` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subservices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `usluga_id` INTEGER NOT NULL,
    `description` MEDIUMTEXT NULL,
    `doctors_id` VARCHAR(255) NULL,
    `create_date` VARCHAR(255) NULL,
    `update_date` VARCHAR(255) NULL,
    `delete_date` VARCHAR(255) NULL,
    `img_src` MEDIUMTEXT NULL,
    `slug` VARCHAR(255) NULL,
    `alt` MEDIUMTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `id` INTEGER NOT NULL,
    `NAME` VARCHAR(255) NOT NULL,
    `create_date` VARCHAR(255) NULL,
    `update_date` VARCHAR(255) NULL,
    `delete_date` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `page_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `page_title` TEXT NOT NULL,
    `page_description` TEXT NOT NULL,
    `page_slug` TEXT NOT NULL,
    `image` TEXT NOT NULL,
    `openGraphType` TEXT NOT NULL,
    `create_at` VARCHAR(255) NOT NULL,
    `update_at` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `socials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `href` TEXT NOT NULL,
    `type` TEXT NOT NULL,
    `active` TINYINT NOT NULL DEFAULT 1,
    `created_at` VARCHAR(255) NOT NULL,
    `updated_at` VARCHAR(255) NULL,
    `deleted_at` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `navigation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `href` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `parent_id` INTEGER NULL,
    `nav_order` INTEGER NOT NULL,
    `created_at` VARCHAR(255) NULL,
    `updated_at` VARCHAR(255) NULL,
    `deleted_at` VARCHAR(255) NULL,
    `active` TINYINT NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `services_price_list` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `service_list_id` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `value` DOUBLE NOT NULL,
    `discount` DOUBLE NULL,
    `created_at` VARCHAR(255) NOT NULL,
    `updated_at` VARCHAR(255) NULL,
    `deleted_at` VARCHAR(255) NULL,
    `active` TINYINT NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
