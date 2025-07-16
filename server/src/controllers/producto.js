import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all products
export async function getProductos(req, res, next) {
    try {
        const productos = await prisma.producto.findMany();
        res.status(200).json(productos);
    } catch (error) {
        next(error);
    }
}

// Create a product (Admin only)
export async function createProducto(req, res, next) {
    try {
        const { producto_nombre, precio, descripcion, url_imagen } = req.body;

        const producto = await prisma.producto.create({
            data: {
                producto_nombre,
                precio,
                descripcion,
                url_imagen,
                admin_id: req.id, // Admin ID from token
            },
        });

        res.status(201).json({ message: "Producto creado exitosamente", producto });
    } catch (error) {
        next(error);
    }
}

// Update a product (Admin only)
export async function updateProducto(req, res, next) {
    try {
        const { producto_id } = req.params;
        const { producto_nombre, precio, descripcion, url_imagen } = req.body;

        const producto = await prisma.producto.update({
            where: { producto_id: parseInt(producto_id) },
            data: {
                producto_nombre,
                precio,
                descripcion,
                url_imagen,
            },
        });

        res.status(200).json({ message: "Producto actualizado exitosamente", producto });
    } catch (error) {
        next(error);
    }
}

// Delete a product (Admin only)
export async function deleteProducto(req, res, next) {
    try {
        const { producto_id } = req.params;

        await prisma.producto.delete({
            where: { producto_id: parseInt(producto_id) },
        });

        res.status(200).json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
        next(error);
    }
}

