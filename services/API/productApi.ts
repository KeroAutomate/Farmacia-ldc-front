import axios from 'axios';
import { Iproduct } from '../productServices';

const api = axios.create({
  baseURL: '/api'
});

interface PaginatedProducts {
  data: Iproduct[];
  totalPages: number;
}

// Função para buscar todos os produtos
export const getAllProducts = async (index: Number, search: string = ''): Promise<PaginatedProducts | undefined> => {
  console.log('PEGANDO NA API');
  const response = await api.get('/products', {
    params: { index, search }
  });
  const produtos = response.data;
  console.log('PRODUTOS', produtos);

  if (produtos && Array.isArray(produtos.data)) {
    return produtos as PaginatedProducts
  }
  return undefined;
};

export const getAllProductsPaginated = async (cursor: number, limit: number) => {
  const response = await api.get(`/products?cursor=${cursor}&limit=${limit}`);
  return response.data;
}
// Função para criar um novo produto
export const createProduct = async (data: Iproduct): Promise<Iproduct> => {
  const response = await api.post('/products', data);
  return response.data;
};

// Função para buscar produto por ID
export const getProductById = async (id: string): Promise<Iproduct> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Função para atualizar um produto
export const updateProduct = async (id: string, data: Partial<Iproduct>): Promise<Iproduct> => {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
};

// Função para deletar um produto
export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};