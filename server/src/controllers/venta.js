import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Crear una venta y sus detalles (requiere autenticación del cliente)
export async function createVenta(req, res, next) {
  try {
    const { productos, fecha_envio } = req.body;
    const cliente_id = req.clientId; // Obtenido del JWT del cliente autenticado

    if (!productos || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ message: "Se requiere al menos un producto" });
    }

    let monto_total = 0;
    const productosIds = productos.map(p => p.producto_id);

    // Obtener productos de la base de datos para validar precios
    const productosDB = await prisma.producto.findMany({
      where: {
        producto_id: {
          in: productosIds
        }
      }
    });

    // Crear un mapa para acceso rápido
    const productosMap = new Map();
    productosDB.forEach(p => {
      productosMap.set(p.producto_id, p);
    });

    // Validar que todos los productos existan
    if (productosDB.length !== productosIds.length) {
      return res.status(400).json({ message: "Uno o más productos no existen" });
    }

    // Crear la venta con sus detalles en una transacción
    const venta = await prisma.$transaction(async (prisma) => {
      // Crear la venta principal
      const nuevaVenta = await prisma.venta.create({
        data: {
          estado: "Completada",
          fecha_venta: new Date(),
          fecha_envio: new Date(fecha_envio || Date.now()),
          monto_total: 0, // Se actualizará después
          cliente_id,
        },
      });

      // Crear los detalles de la venta
      const detalles = [];
      for (const producto of productos) {
        const productoInfo = productosMap.get(producto.producto_id);
        const cantidad = producto.cantidad;
        const sub_total = productoInfo.precio * cantidad;
        
        monto_total += sub_total;

        const detalle = await prisma.venta_detalle.create({
          data: {
            cantidad,
            sub_total,
            venta_id: nuevaVenta.venta_id,
            producto_id: producto.producto_id,
          },
        });

        detalles.push(detalle);
      }

      // Actualizar el monto total de la venta
      const ventaActualizada = await prisma.venta.update({
        where: { venta_id: nuevaVenta.venta_id },
        data: { monto_total },
      });

      return {
        ...ventaActualizada,
        detalles,
      };
    });

    res.status(201).json({
      message: "Venta realizada con éxito",
      venta,
    });
  } catch (error) {
    next(error);
  }
}

// Obtener todas las ventas (solo admin)
export async function getVentas(req, res, next) {
  try {
    const ventas = await prisma.venta.findMany({
      include: {
        cliente: {
          select: {
            nombre: true,
            apellido: true,
            email: true,
          }
        },
        venta_detalle: {
          include: {
            producto: true,
          },
        },
      },
    });
    res.status(200).json(ventas);
  } catch (error) {
    next(error);
  }
}

// Obtener una venta específica por ID (cliente solo puede ver sus propias ventas, admin puede ver todas)
export async function getVentaById(req, res, next) {
  try {
    const { venta_id } = req.params;
    const { role, id } = req.user;

    const query = {
      where: { venta_id: parseInt(venta_id) },
      include: {
        cliente: {
          select: {
            nombre: true,
            apellido: true,
            email: true,
          }
        },
        venta_detalle: {
          include: {
            producto: true,
          },
        },
      },
    };

    // Si es un cliente, solo puede ver sus propias ventas
    if (role === "cliente") {
      query.where.cliente_id = id;
    }

    const venta = await prisma.venta.findUnique(query);

    if (!venta) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }

    res.status(200).json(venta);
  } catch (error) {
    next(error);
  }
}

// Obtener todas las ventas de un cliente (para que el cliente vea su historial)
export async function getClienteVentas(req, res, next) {
  try {
    const cliente_id = req.clientId; // Obtenido del JWT
    
    const ventas = await prisma.venta.findMany({
      where: { cliente_id },
      include: {
        venta_detalle: {
          include: {
            producto: true,
          },
        },
      },
      orderBy: {
        fecha_venta: 'desc'
      }
    });

    res.status(200).json(ventas);
  } catch (error) {
    next(error);
  }
}
