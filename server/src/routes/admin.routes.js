import { Router } from "express";
import { deleteAdmin } from "../controllers/Admin.js";

const router = Router();

router.delete('/admin/:admin_id', deleteAdmin);

export default router;