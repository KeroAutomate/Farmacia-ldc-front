import prisma from "../lib/prisma";

export interface Iproduct{
    id: string;
    nome: string;
    preco: number;
    codigo: number;
    descricao: string;
    quantidade: number;
    imagem: string;
    categoria: string
}


export const get_all_products_paginated = async (page: number = 1, limit: number = 10, search: string = "") => {
    try {
      // Calcula o número de itens a pular (skip)
      const skip = (page - 1) * limit;
  
      // Total de itens na tabela com filtro de pesquisa
      const total = await prisma.produto.count({
        where: {
          OR: [
            { nome: { contains: search } },
            { descricao: { contains: search } },
            { categoria: { contains: search } },
          ],
        },
      });
  
      // Lista de produtos paginada com filtro de pesquisa
      const data = await prisma.produto.findMany({
        skip,
        take: limit,
        where: {
          OR: [
            { nome: { contains: search } },
            { descricao: { contains: search } },
            { categoria: { contains: search } },
          ],
        },
        orderBy: {
          createdAt: "desc", // Ordena os produtos por data de criação (mais recentes primeiro)
        },
      });
  
      // Total de páginas
      const totalPages = Math.ceil(total / limit);
  
      return {
        data,
        total,
        page,
        totalPages,
      };
    } catch (error: any) {
      throw new Error("Erro ao buscar produtos: " + error.message);
    }
  };

  

export const get_number_of_pages = async (pageSize: number) => {
    try{
        const totalProducts = await prisma.produto.count();
        return Math.ceil(totalProducts / pageSize);
    }
    catch(error: any){
        throw new Error('Erro ao buscar produtos: '+ error.message)
    }
}

export const get_all_products = async () => {   
    try{
        const products = await prisma.produto.findMany()
        return products
    }
    catch(error: any){
        throw new Error('Erro ao buscar produtos: '+ error.message)
    }
}

export const get_product_by_id = async (id: string) => {
    try{
        const product = await prisma.produto.findUnique({
            where: {id: id}
        })
        return product
    }
    catch(error: any){
        throw new Error('Erro ao buscar produto: ' + error.message)
    }
}

export const create_product = async (data: Iproduct) => {
    try {
      const newProduct = await prisma.produto.create({
        data: {
            nome: data.nome,
            preco: data.preco,
            codigo: data.codigo,
            descricao: data.descricao,
            quantidade: data.quantidade,
            imagem: data.imagem,
            categoria: data.categoria,
        },
      });
      return newProduct;
    } catch (error: any) {
      throw new Error('Erro ao criar produto: ' + error.message);
    }
};

export const update_product = async (id: string, data: Partial<Iproduct>) => {
    try {
        const updatedProduct = await prisma.produto.update({
            where: { id: id },
            data: {
                nome: data.nome,
                preco: data.preco,
                codigo: data.codigo,
                descricao: data.descricao,
                quantidade: data.quantidade,
                imagem: data.imagem,
                categoria: data.categoria,
            },
        });
        return updatedProduct;
    } catch (error: any) {
        throw new Error("Erro ao atualizar produto: " + error.message);
    }
};

export const delete_product = async (id: string) => {
    try {
        await prisma.produto.delete({
            where: { id: id },
        });
        return { message: "Produto deletado com sucesso" };
    } catch (error: any) {
        throw new Error("Erro ao deletar produto: " + error.message);
    }
};