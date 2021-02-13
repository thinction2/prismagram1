-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "avatar" TEXT NOT NULL DEFAULT 'https://cdns.iconmonstr.com/wp-content/assets/preview/2017/96/iconmonstr-user-32.png',
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "loginSecret" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("id", "avatar", "username", "email", "firstName", "lastName", "bio", "loginSecret", "createdAt", "updatedAt") SELECT "id", coalesce("avatar", 'https://cdns.iconmonstr.com/wp-content/assets/preview/2017/96/iconmonstr-user-32.png') AS "avatar", "username", "email", "firstName", "lastName", "bio", "loginSecret", "createdAt", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
