"use client";
import { TbLogout } from "react-icons/tb";
export const runtime = 'edge';

export default function LogoutButton() {
  const handleLogout = () => {
    // Exibe um alerta de confirmação
    const confirmLogout = window.confirm("Tem certeza que deseja sair?");
    
    if (confirmLogout) {
      localStorage.removeItem("usuario"); // Remove o usuário do Local Storage
      alert("Você foi deslogado com sucesso!");
      window.location.reload(); // Recarrega a página para redirecionar para a tela de login
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 flex flex-row items-center gap-2 "
    >
      Sair
      <TbLogout className="text-white h-6 font-bold"/>
    </button>
  );
}
