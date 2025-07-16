/*
  Warnings:

  - You are about to drop the `Clientes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Clientes";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "cliente" (
    "cliente_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "evento_asistente" (
    "evento_asistente_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cliente_id" INTEGER NOT NULL,
    "evento_id" INTEGER NOT NULL,
    CONSTRAINT "evento_asistente_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente" ("cliente_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "evento_asistente_evento_id_fkey" FOREIGN KEY ("evento_id") REFERENCES "evento" ("evento_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "evento" (
    "evento_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "evento_nombre" TEXT NOT NULL,
    "lugar" TEXT NOT NULL,
    "fecha_evento" DATETIME NOT NULL,
    "aforo" INTEGER NOT NULL,
    "admin_id" INTEGER NOT NULL,
    CONSTRAINT "evento_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "administrador" ("admin_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "administrador" (
    "admin_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "producto" (
    "producto_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "precio" REAL NOT NULL,
    "descripcion" TEXT,
    "url_imagen" TEXT,
    "producto_nombre" TEXT NOT NULL,
    "admin_id" INTEGER NOT NULL,
    CONSTRAINT "producto_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "administrador" ("admin_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "venta_detalle" (
    "venta_detalle_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cantidad" INTEGER NOT NULL,
    "venta_id" INTEGER NOT NULL,
    "producto_id" INTEGER NOT NULL,
    CONSTRAINT "venta_detalle_venta_id_fkey" FOREIGN KEY ("venta_id") REFERENCES "venta" ("venta_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "venta_detalle_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "producto" ("producto_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "venta" (
    "venta_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "estado" TEXT NOT NULL,
    "fecha_venta" DATETIME NOT NULL,
    "fecha_envio" DATETIME NOT NULL,
    "monto_total" REAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    CONSTRAINT "venta_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente" ("cliente_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "cliente_email_key" ON "cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "administrador_correo_key" ON "administrador"("correo");
