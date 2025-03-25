import { NextApiRequest, NextApiResponse } from "next";
import { add_product_cart, edit_product_cart_quantity, get_cart_products, remove_product_cart } from "../../../services/cartServices";
export const runtime = 'edge';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Adicionar produto ao carrinho
    try {
      const produto = await add_product_cart(req.body.idUsuario, req.body.idProduto, req.body.quantidade);
      return res.status(201).json(produto);
    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
      res.status(500).json({ error: 'Erro ao adicionar produto ao carrinho' });
    }
  } else if (req.method === 'GET') {
    // Puxar produtos no carrinho do usuário
    try {
      const { idUsuario } = req.query;
      if (!idUsuario || typeof idUsuario !== 'string') {
        return res.status(400).json({ error: 'ID do usuário inválido' });
      }

      const produtosCarrinho = await get_cart_products(idUsuario);
      return res.status(200).json(produtosCarrinho);
    } catch (error) {
      console.error('Erro ao pegar produtos do carrinho:', error);
      res.status(500).json({ error: 'Erro ao pegar produtos do carrinho' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { idUsuario, idProduto } = req.query;
      if (!idUsuario || typeof idUsuario !== 'string' || !idProduto || typeof idProduto !== 'string') {
        return res.status(400).json({ error: 'ID do usuário ou ID do produto inválido' });
      }

      const produto = await remove_product_cart(idUsuario, idProduto);
      return res.status(200).json(produto);
    }
    catch (error) {
      console.error('Erro ao remover produto do carrinho:', error);
      res.status(500).json({ error: 'Erro ao remover produto do carrinho' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { idUsuario, idProduto, quantidade } = req.body;
      if (!idUsuario || typeof idUsuario !== 'string' || !idProduto || typeof idProduto !== 'string' || !quantidade || typeof quantidade !== 'number') {
        return res.status(400).json({ error: 'ID do usuário, ID do produto ou quantidade inválidos' });
      }

      const produto = await edit_product_cart_quantity(idUsuario, idProduto, quantidade);
      return res.status(200).json(produto);
    } catch (error) {
      console.error('Erro ao editar quantidade do produto no carrinho:', error);
    res.status(500).json({ error: 'Erro ao editar quantidade do produto no carrinho' });
  }
} else {
    res.setHeader('Allow', ['POST', 'GET', 'DELETE', 'PUT']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}