import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

export const addProductToCart = async (idUsuario: string, idProduto: string, quantidade: number) => {
  try {
    const response = await api.post('/cart', {
      idUsuario,
      idProduto,
      quantidade
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao adicionar produto ao carrinho.');
  }
}

export const get_cart = async (idUsuario: string) => {
  try {
    const response = await api.get(`/cart?idUsuario=${idUsuario}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar produtos do carrinho.');
  }
}

export const remove_product_cart = async(idUsuario: string, idProduto: string) => {
  try {
    const response = await api.delete(`/cart?idUsuario=${idUsuario}&idProduto=${idProduto}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao remover produto do carrinho.');
  }
}

export const edit_product_cart_quantity = async(idUsuario: string, idProduto: string, quantidade: number) => {
  try {
    const response = await api.put('/cart', {
      idUsuario,
      idProduto,
      quantidade
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao editar quantidade do produto no carrinho.');
  }
}
