import { NextApiRequest, NextApiResponse } from "next";
import { get_product_by_id, delete_product, update_product} from "../../../services/productServices";
export const runtime = 'edge';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
      return res.status(400).json({ message: 'ID inválido' });
  }

  try {
      switch (req.method) {
          case 'GET': {
              const product = await get_product_by_id(id);
              if (!product) {
                  return res.status(404).json({ message: 'Produto não encontrado' });
              }
              return res.status(200).json(product);
          }
          case 'DELETE': {
              const deleteProduct = await delete_product(id);
              return res.status(200).json(deleteProduct);
          }
          case 'PUT': {
            const updatedProduct = await update_product(id, req.body);
            return res.status(200).json(updatedProduct);
          }
          default:
              res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
              return res.status(405).end(`Método ${req.method} não permitido`);
      }
  } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
  }
}