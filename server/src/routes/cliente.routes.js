import { Router } from "express";
import { createCliente,getClientes } from "../controllers/Cliente.js";

const router = Router();

router.get('/clientes',getClientes);
router.post('/clientes',createCliente);

export default router;