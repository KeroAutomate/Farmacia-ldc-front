"use client";
import { useState } from "react";
import { createUser, getUserId } from "../../../../services/API/userApi";
export const runtime = 'edge';
export default function Login() {
  const [usuario, setUsuario] = useState({ nome: "", numero: "", endereco: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação do número
    if (isNaN(Number(usuario.numero))) {
      alert("O número precisa ser um valor inteiro.");
      return;
    }

    setIsLoading(true);

    try {
      // Tenta buscar o usuário no banco de dados
      const userExists = await getUserId(usuario);

      if (userExists.length > 0) {
        // Se o usuário existir, salva no Local Storage e recarrega a página
        localStorage.setItem("usuario", JSON.stringify(userExists[0]));
        alert("Login realizado com sucesso!");
        window.location.reload();
      } else {
        // Se o usuário não existir, cria um novo usuário
        const newUser = await createUser(usuario);
        localStorage.setItem("usuario", JSON.stringify(newUser));
        alert("Usuário criado e login realizado com sucesso!");
        window.location.reload();
      }
    } catch (error) {
      alert("Erro ao processar login. Tente novamente.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 pt-20">
      <div className="p-6 rounded-xl shadow-md w-full bg-white max-w-sm">
        <h1 className="text-2xl text-black font-bold mb-4">Login ou Cadastro</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black">Nome</label>
            <input
              type="text"
              name="nome"
              value={usuario.nome}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#00ABDD]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Número</label>
            <input
              type="text"
              name="numero"
              value={usuario.numero}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#00ABDD]Marine"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Endereço de entrega</label>
            <input
              type="text"
              name="endereco"
              value={usuario.endereco}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#00ABDD]Marine"
            />
          </div>
          <button
            type="submit"
            className="bg-[#00ABDD] text-white py-2 px-4 rounded-lg w-full hover:bg-[#1F7CC0]"
            disabled={isLoading}
          >
            {isLoading ? "Processando..." : "Entrar / Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
