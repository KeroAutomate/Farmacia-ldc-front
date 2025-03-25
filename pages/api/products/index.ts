import { NextApiRequest, NextApiResponse } from "next";
import { get_all_products_paginated, create_product } from "../../../services/productServices";
export const runtime = 'edge';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      const { index = 1, limit = 20, search = '' } = req.query;

      try {
        // Faça a paginação se pageSize não estiver presente
        const { data, totalPages } = await get_all_products_paginated(Number(index), Number(limit), search as string);

        // Garantir que os dados não contenham BigInt ao serem serializados
        const sanitizedData = data.map((item) =>
          JSON.parse(
            JSON.stringify(item, (_, value) => (typeof value === 'bigint' ? value.toString() : value))
          )
        );

        return res.status(200).json({ data: sanitizedData, totalPages });
      } catch (error) {
        console.error('Erro ao obter produtos paginados:', error);
        return res.status(500).json({ error: 'Erro ao buscar produtos' });
      }
    }
    case 'POST': {
      try {
        const produto = await create_product(req.body);

        // Garantir que o produto não contenha BigInt ao ser serializado
        const sanitizedProduto = JSON.parse(
          JSON.stringify(produto, (_, value) => (typeof value === 'bigint' ? value.toString() : value))
        );

        return res.status(201).json(sanitizedProduto);
      } catch (error) {
        console.error('Erro ao criar produto:', error);
        return res.status(500).json({ error: 'Erro ao criar produto' });
      }
    }
    default: {
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Método ${req.method} não permitido`);
    }
  }
}
