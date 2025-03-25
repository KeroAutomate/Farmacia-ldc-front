import prisma from "../lib/prisma";

export const add_product_cart = async (idUsuario: string, idProduto: string, quantidade: number) => {
  try {
    const cart = await get_cart_products(idUsuario);
    console.log(cart);


    const produtoNoCarrinho = await verify_product_in_cart(idUsuario, idProduto);

    if (!produtoNoCarrinho) {
      const carrinho = await prisma.carrinho.create({
        data: {
          id_usuario: idUsuario,
          id_produto: idProduto,
          quantidade,
        },
      });
  
      return carrinho;
    }
    return null;

  } catch (error: any) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
      throw error;
  }
}

export const verify_product_in_cart = async (idUsuario: string, idProduto: string): Promise<boolean> => {
  try {

    const produtoNoCarrinho = await prisma.carrinho.findFirst({
      where: {
        id_usuario: idUsuario,
        id_produto: idProduto,
      },
    });

    return !!produtoNoCarrinho;
  } catch (error: any) {
      console.error('Erro ao verificar produto no carrinho:', error);
      throw error;
  }
}

export const get_cart_products = async (idUsuario: string) => {
  try {
    const produtosCarrinho = await prisma.carrinho.findMany({
      where: {
        id_usuario: idUsuario,
      },
      include: {
        produto: true,
      },
    });

    // Mapeia os produtos do carrinho para incluir a quantidade explicitamente e converter BigInt para string
    const produtosComQuantidade = produtosCarrinho.map((item) => ({
      id_usuario: item.id_usuario.toString(),
      id_produto: item.id_produto.toString(),
      quantidade: item.quantidade,
      produto: {
        ...item.produto,
        codigo: item.produto.codigo.toString(),
      },
    }));

    return produtosComQuantidade;
  } catch (error: any) {
    console.error('Erro ao pegar produtos do carrinho:', error);
    throw error;
  }
}

export const remove_product_cart = async (idUsuario: string, idProduto: string) => {
  try {
    const produtoNoCarrinho = await verify_product_in_cart(idUsuario, idProduto);

    if (produtoNoCarrinho) {
      const carrinho = await prisma.carrinho.deleteMany({
        where: {
          id_usuario: idUsuario,
          id_produto: idProduto,
        },
      });
  
      return carrinho;
    }
    return null;
  } catch (error: any) {
    console.error('Erro ao remover produto do carrinho:', error);
    throw error;
  }
}

export const edit_product_cart_quantity = async (idUsuario: string, idProduto: string, quantidade: number) => {
  try {
    const produtoNoCarrinho = await verify_product_in_cart(idUsuario, idProduto);

    if (produtoNoCarrinho) {
      const carrinho = await prisma.carrinho.updateMany({
        where: {
          id_usuario: idUsuario,
          id_produto: idProduto,
        },
        data: {
          quantidade,
        },
      });
  
      return carrinho;
    }
    return null;
  } catch (error: any) {
    console.error('Erro ao editar quantidade do produto no carrinho:', error);
    throw error;
  }
}