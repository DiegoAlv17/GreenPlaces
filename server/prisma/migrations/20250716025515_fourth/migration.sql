/*
  Warnings:

  - A unique constraint covering the columns `[dni]` on the table `administrador` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "administrador_dni_key" ON "administrador"("dni");
