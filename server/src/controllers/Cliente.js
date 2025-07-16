import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function createCliente(req, res,next){
    try {
        const cliente = await prisma.cliente.create({
            data: req.body})
            res.json(cliente);
    } catch (error) {
        next(error);
    }
}
export async function getClientes(req,res,next){
    try {
        const clientes = await prisma.cliente.findMany();
            res.json(clientes);
    } catch (error) {
        next(error);
    }
}