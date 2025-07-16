import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const JWT_SECRET = process.env.SECRET || "green_places_secure_jwt_secret_key";

// Register for Cliente
export async function registerCliente(req, res, next) {
    try {
        const { nombre, apellido, email, contraseña } = req.body;

        // Check if cliente already exists
        const existingCliente = await prisma.cliente.findUnique({
            where: { email },
        }) || await prisma.administrador.findUnique({
            where: { email }
        })

        if (existingCliente) {
            return res.status(400).json({ message: "El email ya está registrado" });
        }

        const hashedPassword = await bcrypt.hash(contraseña, 10);

        const cliente = await prisma.cliente.create({
            data: {
                nombre,
                apellido,
                email,
                contraseña: hashedPassword,
            },
        });

        // Don't return the hashed password
        const { contraseña: _, ...clienteData } = cliente;
        res.status(201).json({
            message: "Cliente registrado exitosamente",
            cliente: clienteData
        });
    } catch (error) {
        next(error);
    }
}

// Register for Administrador
export async function registerAdministrador(req, res, next) {
    try {
        const { nombre, apellido, telefono, dni, email, contraseña } = req.body;

        // Check if administrador already exists
        const existingAdmin = await prisma.administrador.findUnique({
            where: { email }
        })

        const existingDni = await prisma.administrador.findUnique({
            where: { dni }
        })

        const existingCliente = await prisma.cliente.findUnique({
            where: { email }
        });

        if (existingAdmin || existingCliente) {
            return res.status(400).json({ message: "El email ya está registrado" });
        }
        
        if (existingDni) {
            return res.status(400).json({ message: "El DNI ya está registrado" });
        }


        const hashedPassword = await bcrypt.hash(contraseña, 10);

        const administrador = await prisma.administrador.create({
            data: {
                nombre,
                apellido,
                telefono,
                dni,
                email,
                contraseña: hashedPassword,
            },
        });

        // Don't return the hashed password
        const { contraseña: _, ...adminData } = administrador;
        res.status(201).json({
            message: "Administrador registrado exitosamente",
            administrador: adminData
        });
    } catch (error) {
        next(error);
    }
}

// Login for both Cliente and Administrador
export async function login(req, res, next) {
    try {
        const { email, contraseña } = req.body;

        // Check if user is Cliente
        const cliente = await prisma.cliente.findUnique({
            where: { email },
        });

        if (cliente && (await bcrypt.compare(contraseña, cliente.contraseña))) {
            const token = jwt.sign({ id: cliente.cliente_id, role: "cliente" }, JWT_SECRET, {
                expiresIn: "1h",
            });

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000 // 1 hour
            });

            // Don't return password in response
            const { contraseña: _, ...clienteData } = cliente;
            return res.json({
                message: "Login successful",
                role: "cliente",
                user: clienteData
            });
        }

        // Check if user is Administrador
        const administrador = await prisma.administrador.findUnique({
            where: { email: email },
        });

        if (administrador && (await bcrypt.compare(contraseña, administrador.contraseña))) {
            const token = jwt.sign({ id: administrador.admin_id, role: "administrador" }, JWT_SECRET, {
                expiresIn: "1h",
            });

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000 // 1 hour
            });

            // Don't return password in response
            const { contraseña: _, ...adminData } = administrador;
            return res.json({
                message: "Login successful",
                role: "administrador",
                user: adminData
            });
        }

        res.status(401).json({ message: "Credenciales inválidas" });
    } catch (error) {
        next(error);
    }
}

// Logout
export async function logout(req, res, next) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });
        res.json({ message: "Sesión cerrada exitosamente" });
    } catch (error) {
        next(error);
    }
}

// Middleware to verify JWT Token
export function verifyToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado. Inicie sesión para continuar." });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.clearCookie("token");
        return res.status(403).json({ message: "Token inválido o expirado" });
    }
}

// Middleware to check if user is Cliente
export function isCliente(req, res, next) {
    if (req.user && req.user.role === "cliente") {
        next();
    } else {
        res.status(403).json({ message: "Acceso denegado. Se requiere rol de cliente" });
    }
}

// Middleware to check if user is Administrador
export function isAdministrador(req, res, next) {
    if (req.user && req.user.role === "administrador") {
        next();
    } else {
        res.status(403).json({ message: "Acceso denegado. Se requiere rol de administrador" });
    }
}
