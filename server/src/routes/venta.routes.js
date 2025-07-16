import { Router } from "express";
import {
    createVenta,
    getVentas,
    getVentaById,
    getClienteVentas
} from "../controllers/venta.js";
import { authenticateAdmin } from "../middlewares/authMiddleware.js";
import { authenticateCliente } from "../middlewares/authMiddleware.js";

const router = Router();

// Rutas protegidas para clientes (requieren autenticación)
router.post("/ventas", authenticateCliente, createVenta);
router.get("/cliente/ventas", authenticateCliente, getClienteVentas);
router.get("/cliente/ventas/:venta_id", authenticateCliente, getVentaById);

// Rutas protegidas para administradores
router.get("/ventas", authenticateAdmin, getVentas);
router.get("/ventas/:venta_id", authenticateAdmin, getVentaById);

export default router;
