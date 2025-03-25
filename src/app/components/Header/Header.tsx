"use client";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';
import CartItem from '../CartItem/cartitem';

import LogoutButton from '../SliderProducts/LogoutButton';
export const runtime = 'edge';

interface cartItem {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  imagem: string;
}

const Header = ({search, setSearch, setQuery, cart, id_usuario, fetchCart}: {
  search: string, 
  setSearch : Dispatch<SetStateAction<string>>, 
  setQuery: Dispatch<SetStateAction<string>>,
  cart: cartItem[],
  fetchCart: () => void,
  id_usuario: string
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState({ nome: '', numero: '', endereco: '' });


  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      console.log("Stored user")
      console.log(storedUser)
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const get_total_price = () => {
    return cart.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  }


  const handle_finalizar_pedido = () => {
    const numeroWhatsApp = '558899120096'; // Substitua pelo número de telefone do destinatário no formato internacional
    const mensagem = encodeURIComponent('Olá, gostaria de finalizar meu pedido.'); // Mensagem que será enviada

    const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
    window.open(url, '_blank');
  }  

  return (
    <header className="w-full py-4 bg-[#00ABDD] fixed top-0 z-10">
      <div className="flex flex-row justify-between items-center mx-4 lg:mx-14">
        <div className="logo">
          <Link href="/">
            <Image src="/logo.png" alt="Logo da Empresa" width={150} height={150} />
          </Link>
        </div>
        <div className="relative w-full max-w-[507px]">
          <input
            type="text"
            placeholder="O que deseja encontrar?"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setQuery(search); // Confirma a busca ao pressionar Enter
              }
            }}
            className="text-sm md:text-lg p-2 pr-8 md:pr-10 w-full h-[40px] md:h-[50px] rounded-lg outline-none bg-white"
          />
          <span className="pointer-events-none absolute z-10 right-2 top-1/2 transform -translate-y-1/2">
            <Image src="/search.svg" alt="Icone de Pesquisa" width={20} height={20} />
          </span>
        </div>
        <div className="my-cart flex items-center gap-2 cursor-pointer ml-10 md:ml-0" onClick={toggleSidebar}>
          <span className="cart-bg flex items-center justify-center w-5 h-5 md:w-12 md:h-12 bg-transparent lg:bg-[#1F7CC0] rounded-lg transition-all duration-300 ease-in-out hover:bg-[#1B3680]">
            {cart.length > 0 && (
              <p className='bg-white p-1 rounded-full w-5 h-5 md:w-6 md:h-6 z-20 fixed flex items-center justify-center mb-6 mr-6 md:mb-10 md:mr-10 font-bold text-[#00ABDD]Marine'>{cart.length}</p>)}
            <Image className="cart" src="/cart.svg" alt="Carrinho" width={36} height={30} />
          </span>
          <span className="cart-text text-white font-bold text-xs md:text-base hidden lg:block">Meu Carrinho</span>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar} // Fecha a sidebar ao clicar no overlay
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-[70%] md:w-[40%] lg:w-[25%] h-full bg-white z-20 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } overflow-y-auto p-4`}
      >
        <div className="flex items-center pb-4">
          <FaArrowLeft size={20} className="cursor-pointer" onClick={toggleSidebar} />
          <h1 className="font-bold text-center text-xl text-black w-full">Meu Carrinho</h1>
        </div>
        <div className="cart-items">
          {
            cart.map((item, index) => (
              <CartItem 
                key={index}
                image={item.imagem}
                product={item.nome}
                price={item.preco}
                idUser={id_usuario}
                idProduct={item.id}
                quantity={item.quantidade}
                addItemToCart={() => {}}
                removeItemFromCart={() => {}}
                fetchCart={fetchCart}
              />
            ))
          }
        </div>
        <div className="bottom-checkout">
          <div className="flex flex-row justify-center mt-8">
            <span className="font-bold text-xl mt-2 mr-1">Total:</span>
            <span className="font-bold text-xl mt-2">{(get_total_price()).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
          <button onClick={handle_finalizar_pedido} className='bg-[#00ABDD] text-white p-3 w-auto font-bold h-8 flex items-center justify-center rounded-lg mx-auto mt-4' > Finalizar Pedido </button>
          <div className='mt-20 flex justify-center'>
            <LogoutButton/>
          </div>
          <p className='text-xs w-[80%] mx-auto py-2 mt-2'>
            {user.nome}
            <br/>
            {user.numero}
            <br/>
            {user.endereco}
          </p>
          <p className='text-xs w-[80%] mx-auto py-2 mt-2'>Ao clicar em finalizar pedido, você será redirecionado para o whatsapp juntamente com os dados do seu pedido.</p>
          <p className='text-xs w-[80%] mx-auto py-2'>Ao clicar em sair, você tera que entrar novamente no site com seus dados como nome, numero e endereço de entrega.</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
