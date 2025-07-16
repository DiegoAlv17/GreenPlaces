import { Router } from "express";
import { deleteAdmin,getAdmins } from "../controllers/Admin.js";

const router = Router();

router.delete('/admin/:admin_id', deleteAdmin);
router.get('/admins', getAdmins); // Assuming you have a method to get admins

export default router;