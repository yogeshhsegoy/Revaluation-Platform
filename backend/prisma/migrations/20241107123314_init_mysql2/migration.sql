/*
  Warnings:

  - Added the required column `studentId` to the `AnswerSheets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `AnswerSheets` ADD COLUMN `studentId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `AnswerSheets` ADD CONSTRAINT `AnswerSheets_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
