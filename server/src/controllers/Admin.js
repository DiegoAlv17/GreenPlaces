import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

//Agregar metodo getAdmins
export async function getAdmins(req, res, next) {
    try {
        const admins = await prisma.administrador.findMany();
        res.json(admins);
    } catch (error) {
        next(error);
    }
}
export async function deleteAdmin(req,res,next){
    try {
        const { admin_id } = req.params;
        const admin = await prisma.administrador.delete({
            where: { admin_id: parseInt(admin_id) }
        });
        res.json(admin);
    } catch (error) {
        next(error);
    }
}   