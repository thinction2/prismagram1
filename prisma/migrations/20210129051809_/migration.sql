/*
  Warnings:

  - You are about to drop the `_RoomToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateTable
CREATE TABLE "_ChatRoom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_RoomToUser";
PRAGMA foreign_keys=on;

-- CreateIndex
CREATE UNIQUE INDEX "_ChatRoom_AB_unique" ON "_ChatRoom"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatRoom_B_index" ON "_ChatRoom"("B");
