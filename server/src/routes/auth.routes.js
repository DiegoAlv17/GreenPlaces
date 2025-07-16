import { Router } from "express";
import { 
    registerCliente, 
    registerAdministrador, 
    login, 
    logout, 
    verifyToken, 
    isCliente, 
    isAdministrador 
} from "../controllers/auth.js";

const router = Router();

// Auth routes
router.post('/register/cliente', registerCliente);
router.post('/register/admin', registerAdministrador);
router.post('/login', login);
router.post('/logout', logout);

// Test protected routes
router.get('/profile/cliente', verifyToken, isCliente, (req, res) => {
    res.json({ message: "Ruta protegida para clientes", userId: req.user.id });
});

router.get('/profile/admin', verifyToken, isAdministrador, (req, res) => {
    res.json({ message: "Ruta protegida para administradores", userId: req.user.id });
});

export default router;
