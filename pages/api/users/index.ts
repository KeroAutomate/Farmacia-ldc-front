import { NextApiRequest, NextApiResponse } from 'next';
import { create_user, get_all_users, get_user_by_id, get_user_by_details, update_user, delete_user } from '../../../services/userServices';
export const runtime = 'edge';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      const { nome, numero, endereco } = req.query;

      if (nome && numero && endereco) {
        // Busca usuário específico pelo nome, número e endereço
        const usuario = await get_user_by_details({
          nome: String(nome),
          numero: Number(numero),
          endereco: String(endereco),
        });

        if (!usuario) {
          return res.status(200).json([]); // Retorna o usuário em formato de array para consistência
        }

        return res.status(200).json([usuario]); // Retorna o usuário em formato de array para consistência
      }

      // Retorna todos os usuários se não houver parâmetros de busca
      const usuarios = await get_all_users();
      return res.status(200).json({ usuarios });
    }

    case 'POST': {
      const user = await create_user(req.body);
      const userCreated = await get_user_by_id(user.id);
      if (!userCreated) {
        return res.status(500).json({ error: 'Erro ao criar usuário' });
      }
      return res.status(201).json(user);
    }

    case 'PUT': {
      const { id } = req.query;
      const updatedUser = await update_user(String(id), req.body);
      return res.status(200).json(updatedUser);
    }

    case 'DELETE': {
      const { id } = req.query;
      const deletedUser = await delete_user(String(id));
      return res.status(200).json(deletedUser);
    }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Método ${req.method} não permitido`);
  }
}
