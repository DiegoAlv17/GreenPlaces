/*
  Warnings:

  - You are about to drop the column `correo` on the `administrador` table. All the data in the column will be lost.
  - Added the required column `email` to the `administrador` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_administrador" (
    "admin_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL
);
INSERT INTO "new_administrador" ("admin_id", "apellido", "contraseña", "dni", "nombre", "telefono") SELECT "admin_id", "apellido", "contraseña", "dni", "nombre", "telefono" FROM "administrador";
DROP TABLE "administrador";
ALTER TABLE "new_administrador" RENAME TO "administrador";
CREATE UNIQUE INDEX "administrador_email_key" ON "administrador"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
