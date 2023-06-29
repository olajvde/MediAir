-- CreateTable
CREATE TABLE `Drone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `serialNumber` VARCHAR(100) NOT NULL,
    `model` ENUM('Lightweight', 'Middleweight', 'Cruiseweight', 'Heavyweight') NOT NULL,
    `weight` INTEGER NOT NULL,
    `battery` INTEGER NOT NULL,
    `state` ENUM('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING') NOT NULL DEFAULT 'IDLE',

    UNIQUE INDEX `Drone_uuid_key`(`uuid`),
    UNIQUE INDEX `Drone_serialNumber_key`(`serialNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medication` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `weight` INTEGER NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Medication_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DroneWelfareLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `Drone` VARCHAR(191) NOT NULL,
    `state` ENUM('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING') NOT NULL,
    `batteryCapacity` INTEGER NOT NULL,

    UNIQUE INDEX `DroneWelfareLog_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
