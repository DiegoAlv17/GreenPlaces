import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los eventos (público) - incluye conteo de inscritos
export async function getEventos(req, res, next) {
    try {
        // Obtener eventos con relación al administrador
        const eventos = await prisma.evento.findMany({
            include: { 
                administrador: {
                    select: {
                        nombre: true,
                        apellido: true
                    }
                }
            }
        });

        // Para cada evento, contar los asistentes inscritos
        const eventosConConteo = await Promise.all(eventos.map(async (evento) => {
            const conteoAsistentes = await prisma.evento_asistente.count({
                where: { evento_id: evento.evento_id }
            });
            
            // Calcular cupos disponibles
            const cuposDisponibles = evento.aforo - conteoAsistentes;
            
            return {
                ...evento,
                asistentes_inscritos: conteoAsistentes,
                cupos_disponibles: cuposDisponibles >= 0 ? cuposDisponibles : 0
            };
        }));

        res.status(200).json(eventosConConteo);
    } catch (error) {
        next(error);
    }
}

// Crear evento (solo admin)
export async function createEvento(req, res, next) {
    try {
        const { evento_nombre, lugar, fecha_evento, aforo, url_imagen } = req.body;
        const evento = await prisma.evento.create({
            data: {
                evento_nombre,
                lugar,
                fecha_evento: new Date(fecha_evento),
                aforo,
                url_imagen,
                admin_id: req.adminId,
            },
        });
        res.status(201).json({ message: "Evento creado exitosamente", evento });
    } catch (error) {
        next(error);
    }
}

// Actualizar evento (solo admin)
export async function updateEvento(req, res, next) {
    try {
        const { evento_id } = req.params;
        const { evento_nombre, lugar, fecha_evento, aforo, url_imagen } = req.body;
        
        // Verificar que el evento pertenezca al administrador que hace la solicitud
        const eventoExistente = await prisma.evento.findUnique({
            where: { evento_id: parseInt(evento_id) }
        });
        
        if (!eventoExistente) {
            return res.status(404).json({ message: "Evento no encontrado" });
        }
        
        if (eventoExistente.admin_id !== req.adminId) {
            return res.status(403).json({ message: "No tienes permiso para editar este evento" });
        }
        
        const evento = await prisma.evento.update({
            where: { evento_id: parseInt(evento_id) },
            data: {
                evento_nombre,
                lugar,
                fecha_evento: new Date(fecha_evento),
                aforo,
                url_imagen,
            },
        });
        res.status(200).json({ message: "Evento actualizado exitosamente", evento });
    } catch (error) {
        next(error);
    }
}

// Eliminar evento (solo admin)
export async function deleteEvento(req, res, next) {
    try {
        const { evento_id } = req.params;
        
        // Verificar que el evento pertenezca al administrador que hace la solicitud
        const eventoExistente = await prisma.evento.findUnique({
            where: { evento_id: parseInt(evento_id) }
        });
        
        if (!eventoExistente) {
            return res.status(404).json({ message: "Evento no encontrado" });
        }
        
        if (eventoExistente.admin_id !== req.adminId) {
            return res.status(403).json({ message: "No tienes permiso para eliminar este evento" });
        }
        
        // Primero eliminar todas las inscripciones al evento
        await prisma.evento_asistente.deleteMany({
            where: { evento_id: parseInt(evento_id) }
        });
        
        // Luego eliminar el evento
        await prisma.evento.delete({
            where: { evento_id: parseInt(evento_id) },
        });
        
        res.status(200).json({ message: "Evento eliminado exitosamente" });
    } catch (error) {
        next(error);
    }
}

// INSCRIPCIÓN A EVENTOS

// Cliente se inscribe a un evento
export async function inscribirseEvento(req, res, next) {
    try {
        const { evento_id } = req.params;
        const cliente_id = req.clientId; // Obtenido del JWT
        
        // Verificar que el evento exista
        const evento = await prisma.evento.findUnique({
            where: { evento_id: parseInt(evento_id) }
        });
        
        if (!evento) {
            return res.status(404).json({ message: "Evento no encontrado" });
        }
        
        // Verificar si el cliente ya está inscrito
        const inscripcionExistente = await prisma.evento_asistente.findFirst({
            where: {
                cliente_id: cliente_id,
                evento_id: parseInt(evento_id)
            }
        });
        
        if (inscripcionExistente) {
            return res.status(400).json({ message: "Ya estás inscrito en este evento" });
        }
        
        // Verificar si hay cupos disponibles
        const asistentesCount = await prisma.evento_asistente.count({
            where: { evento_id: parseInt(evento_id) }
        });
        
        if (asistentesCount >= evento.aforo) {
            return res.status(400).json({ message: "Lo sentimos, no hay cupos disponibles para este evento" });
        }
        
        // Inscribir al cliente
        const inscripcion = await prisma.evento_asistente.create({
            data: {
                cliente_id: cliente_id,
                evento_id: parseInt(evento_id)
            },
            include: {
                evento: true
            }
        });
        
        res.status(201).json({ 
            message: "Inscripción exitosa", 
            inscripcion
        });
    } catch (error) {
        next(error);
    }
}

// Cliente cancela inscripción a evento
export async function cancelarInscripcion(req, res, next) {
    try {
        const { evento_id } = req.params;
        const cliente_id = req.clientId; // Obtenido del JWT
        
        // Verificar que la inscripción exista
        const inscripcion = await prisma.evento_asistente.findFirst({
            where: {
                cliente_id: cliente_id,
                evento_id: parseInt(evento_id)
            }
        });
        
        if (!inscripcion) {
            return res.status(404).json({ message: "No estás inscrito en este evento" });
        }
        
        // Cancelar inscripción
        await prisma.evento_asistente.delete({
            where: { evento_asistente_id: inscripcion.evento_asistente_id }
        });
        
        res.status(200).json({ message: "Inscripción cancelada exitosamente" });
    } catch (error) {
        next(error);
    }
}

// Cliente ve sus eventos inscritos
export async function misEventos(req, res, next) {
    try {
        const cliente_id = req.clientId; // Obtenido del JWT
        
        const inscripciones = await prisma.evento_asistente.findMany({
            where: { cliente_id: cliente_id },
            include: {
                evento: {
                    include: {
                        administrador: {
                            select: {
                                nombre: true,
                                apellido: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                evento: {
                    fecha_evento: 'asc'
                }
            }
        });
        
        res.status(200).json(inscripciones);
    } catch (error) {
        next(error);
    }
}

// Administrador ve los asistentes a sus eventos
export async function getAsistentesEvento(req, res, next) {
    try {
        const { evento_id } = req.params;
        const admin_id = req.adminId; // Obtenido del JWT
        
        // Verificar que el evento pertenezca al administrador
        const evento = await prisma.evento.findUnique({
            where: { evento_id: parseInt(evento_id) }
        });
        
        if (!evento) {
            return res.status(404).json({ message: "Evento no encontrado" });
        }
        
        if (evento.admin_id !== admin_id) {
            return res.status(403).json({ message: "No tienes permiso para ver los asistentes de este evento" });
        }
        
        // Obtener asistentes
        const asistentes = await prisma.evento_asistente.findMany({
            where: { evento_id: parseInt(evento_id) },
            include: {
                cliente: {
                    select: {
                        cliente_id: true,
                        nombre: true,
                        apellido: true,
                        email: true
                    }
                }
            }
        });
        
        // Contar asistentes y calcular cupos disponibles
        const totalAsistentes = asistentes.length;
        const cuposDisponibles = evento.aforo - totalAsistentes;
        
        res.status(200).json({
            evento: {
                ...evento,
                asistentes_inscritos: totalAsistentes,
                cupos_disponibles: cuposDisponibles >= 0 ? cuposDisponibles : 0
            },
            asistentes
        });
    } catch (error) {
        next(error);
    }
}

// Administrador ve todos sus eventos con conteo de asistentes
export async function misEventosAdmin(req, res, next) {
    try {
        const admin_id = req.adminId; // Obtenido del JWT
        
        // Obtener todos los eventos del administrador
        const eventos = await prisma.evento.findMany({
            where: { admin_id: admin_id },
            orderBy: { fecha_evento: 'asc' }
        });
        
        // Para cada evento, contar los asistentes inscritos
        const eventosConConteo = await Promise.all(eventos.map(async (evento) => {
            const conteoAsistentes = await prisma.evento_asistente.count({
                where: { evento_id: evento.evento_id }
            });
            
            // Calcular cupos disponibles
            const cuposDisponibles = evento.aforo - conteoAsistentes;
            
            return {
                ...evento,
                asistentes_inscritos: conteoAsistentes,
                cupos_disponibles: cuposDisponibles >= 0 ? cuposDisponibles : 0
            };
        }));
        
        res.status(200).json(eventosConConteo);
    } catch (error) {
        next(error);
    }
}
