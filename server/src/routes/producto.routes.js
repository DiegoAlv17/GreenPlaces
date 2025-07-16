import { Router } from "express";
import {
    getProductos,
    createProducto,
    updateProducto,
    deleteProducto,
} from "../controllers/producto.js";
import { authenticateAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

// Public route
router.get("/productos", getProductos);

// Protected routes (Admin only)
router.post("/productos", authenticateAdmin, createProducto);
router.put("/productos/:producto_id", authenticateAdmin, updateProducto);
router.delete("/productos/:producto_id", authenticateAdmin, deleteProducto);

export default router;
