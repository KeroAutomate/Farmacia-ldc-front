import { NextApiRequest, NextApiResponse } from 'next';
export const runtime = 'edge';

// Configuração do rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutos
//   max: 10, // Máximo de 10 requisições por janela de tempo
//   message: { success: false, message: 'Muitas tentativas de login. Tente novamente mais tarde.' },
//   standardHeaders: true, // Retorna informações de rate limit nos headers
//   legacyHeaders: false, // Desabilita cabeçalhos obsoletos
// });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Middleware de rate limit


  if (req.method === 'POST') {
    const { name, senha } = req.body;

    // Comparar com variáveis de ambiente
    const validUser = process.env.BACKOFFICEUSER;
    const validPassword = process.env.BACKOFFICEPASSWORD;

    if (name === validUser && senha === validPassword) {
      return res.status(200).json({ success: true, message: 'Login bem-sucedido!' });
    } else {
      return res.status(401).json({ success: false, message: 'Usuário ou senha inválidos.' });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
