'use client';
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';
import Slider from './components/SliderProducts/Slider';
import SliderAds from './components/SliderAds/SliderAds';
import SliderAdsDouble from './components/SliderAdsDouble/SliderAdsDouble';
import { useCallback, useEffect, useState } from "react";
import GridSearch from "./components/SliderProducts/GridSearch";
import { get_cart } from "../../services/API/cartApi";
import Login from "./components/Login/Login";
export const runtime = 'edge';

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [cart, setCart] = useState<[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');


  // Verifica se o usuário está salvo no Local Storage
  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user) {
      setIsLoggedIn(true);
      const userData = JSON.parse(user);
      setUserId(userData.id);
    }
  }, []);

  interface Iproduct {
    codigo: string;
    quantidade: number;
    id: string;
    nome: string;
    preco: number;
    descricao: string;
    imagem: string;
    categoria: string;
    createdAt: Date;
    updatedAt: Date;
  }


  
  const fetchCart = useCallback(async () => {
    const cartUser = await get_cart(userId);
    const result = cartUser.map((item: { produto: Iproduct; quantidade: number }) => ({
      ...item.produto,
      quantidade: item.quantidade,
    }));
    setCart(result);
  }, [userId]);
  
  // Função para buscar o carrinho, chamada quando o userId for atualizado
  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId, fetchCart]);  // Executa o fetchCart apenas quando o userId for atualizado
  useEffect(() => {
    console.log(search);
  }, [search, query]);

  // Se o usuário não estiver logado, exibe a tela de login
  // if (!isLoggedIn) {
  //   return <Login />;
  // }

  // Conteúdo principal da página
  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        setQuery={setQuery}
        cart={cart}
        fetchCart={fetchCart}
        id_usuario={userId}
      />
      <main className="mt-20 lg:mt-14">
        {query === "" ? (
          <>
            <SliderAds />
            <Slider fetchCart={fetchCart} />
            <SliderAdsDouble />
          </>
        ) : (
          <GridSearch searchword={query} fetchCart={fetchCart} />
        )}
      </main>
      <Footer />
    </>
  );
}
