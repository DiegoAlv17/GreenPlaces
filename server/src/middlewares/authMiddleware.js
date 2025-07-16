import jwt from "jsonwebtoken";

export function authenticateAdmin(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No se proporcionó un token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "green_places_secure_jwt_secret_key");

        if (decoded.role !== "administrador") {
            return res.status(403).json({ message: "Acceso denegado: no eres administrador" });
        }

        req.id = decoded.id; // Extraer el id del administrador
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido" });
    }
}
