/*
  Warnings:

  - Added the required column `url_imagen` to the `evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_total` to the `venta_detalle` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_evento" (
    "evento_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "evento_nombre" TEXT NOT NULL,
    "lugar" TEXT NOT NULL,
    "fecha_evento" DATETIME NOT NULL,
    "aforo" INTEGER NOT NULL,
    "url_imagen" TEXT NOT NULL,
    "admin_id" INTEGER NOT NULL,
    CONSTRAINT "evento_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "administrador" ("admin_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_evento" ("admin_id", "aforo", "evento_id", "evento_nombre", "fecha_evento", "lugar") SELECT "admin_id", "aforo", "evento_id", "evento_nombre", "fecha_evento", "lugar" FROM "evento";
DROP TABLE "evento";
ALTER TABLE "new_evento" RENAME TO "evento";
CREATE TABLE "new_venta_detalle" (
    "venta_detalle_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cantidad" INTEGER NOT NULL,
    "sub_total" REAL NOT NULL,
    "venta_id" INTEGER NOT NULL,
    "producto_id" INTEGER NOT NULL,
    CONSTRAINT "venta_detalle_venta_id_fkey" FOREIGN KEY ("venta_id") REFERENCES "venta" ("venta_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "venta_detalle_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "producto" ("producto_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_venta_detalle" ("cantidad", "producto_id", "venta_detalle_id", "venta_id") SELECT "cantidad", "producto_id", "venta_detalle_id", "venta_id" FROM "venta_detalle";
DROP TABLE "venta_detalle";
ALTER TABLE "new_venta_detalle" RENAME TO "venta_detalle";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
