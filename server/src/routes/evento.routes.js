import { Router } from "express";
import {
    getEventos,
    createEvento,
    updateEvento,
    deleteEvento,
    inscribirseEvento,
    cancelarInscripcion,
    misEventos,
    getAsistentesEvento,
    misEventosAdmin
} from "../controllers/evento.js";
import { authenticateAdmin, authenticateCliente } from "../middlewares/authMiddleware.js";

const router = Router();

// Rutas públicas
router.get("/eventos", getEventos);

// Rutas protegidas para clientes
router.post("/eventos/:evento_id/inscribirse", authenticateCliente, inscribirseEvento);
router.delete("/eventos/:evento_id/cancelar", authenticateCliente, cancelarInscripcion);
router.get("/cliente/eventos", authenticateCliente, misEventos);

// Rutas protegidas para administradores
router.post("/eventos", authenticateAdmin, createEvento);
router.put("/eventos/:evento_id", authenticateAdmin, updateEvento);
router.delete("/eventos/:evento_id", authenticateAdmin, deleteEvento);
router.get("/admin/eventos", authenticateAdmin, misEventosAdmin);
router.get("/admin/eventos/:evento_id/asistentes", authenticateAdmin, getAsistentesEvento);

export default router;
