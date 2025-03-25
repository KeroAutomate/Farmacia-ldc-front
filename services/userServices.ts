import prisma from "../lib/prisma";

export interface Iuser{
    nome: string;
    numero: number;
    endereco: string;
}

export const get_all_users = async () => {
    try{
        const users = await prisma.usuario.findMany()
        return users
    }
    catch(error: any){
        throw new Error('Erro ao buscar usuários: '+ error.message)
    }
}

export const get_user_by_id = async (id: string) => {
    try{
        const user = await prisma.usuario.findUnique({
            where: {id: id},
        })
        return user
    }
    catch(error: any){
        throw new Error('Erro ao buscar usuário: ' + error.message);
    }
}

export const create_user = async (data: Iuser) => {
    try {
      const newUser = await prisma.usuario.create({
        data: {
            nome: data.nome,
            numero: data.numero.toString(),
            endereco: data.endereco,
        },
      });
      await create_status(newUser.id, 'Pendente')
      return newUser;
    } catch (error: any) {
      throw new Error('Erro ao criar usuário: ' + error.message);
    }
};

export const update_user = async (id: string, data: Partial<Iuser>) => {
    try {
        const updatedUser = await prisma.usuario.update({
            where: { id: id },
            data: {
                nome: data.nome,
                numero: data.numero?.toString(),
                endereco: data.endereco,
            },
        });
        return updatedUser;
    } catch (error: any) {
        throw new Error('Erro ao atualizar usuário: ' + error.message);
    }
};

export const delete_user = async (id: string) => {
    try {
        const deletedUser = await prisma.usuario.delete({
            where: { id: id },
        });
        return deletedUser;
    } catch (error: any) {
        throw new Error('Erro ao deletar usuário: ' + error.message);
    }
};

export const create_status = async (id_user: string, status: string) => {
    try{
        const Status = await prisma.pedido.create({
            data: {
                usuario_id: id_user,
                status: status
            }
        })
        return Status
    } catch (error: any) {
        throw new Error('Erro ao atualizar usuário: ' + error.message)
    }
}

export const get_user_by_details = async (data: Iuser) => {
    try {
        const user = await prisma.usuario.findFirst({
            where: {
                nome: data.nome,
                numero: data.numero.toString(),
                endereco: data.endereco,
            },
        });
        if (!user) {
            return null;
        }
        return user;
    } catch (error: any) {
        throw new Error(`Erro em get_user_by_details: ${error.message}`);
    }
};
