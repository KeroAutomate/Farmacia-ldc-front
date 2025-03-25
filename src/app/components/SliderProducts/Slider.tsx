'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Navigation, Pagination } from 'swiper/modules';
import './Slider.css';
import { useCallback, useEffect, useState } from 'react';
import { getAllProducts } from '../../../../services/API/productApi';
import { Iproduct } from '../../../../services/productServices';
import ProductCard from '../ProductCard';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);

    handleChange(); // Set the initial value
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

interface ProductCarouselProps {
  fetchCart: () => void;
}

const ProductCarousel = ({ fetchCart }: ProductCarouselProps) => {
  const [query] = useState<string>(""); // Valor usado na busca
  const [index] = useState<number>(1); // Cursor para paginação
  const [produtos, setProdutos] = useState<Iproduct[]>([]); // Lista de produtos

  const fetchProdutos = useCallback(async () => {
    try {
      const produto = await getAllProducts(index, query); // Inclua o `query` como parâmetro
      if (produto) {
        setProdutos(produto.data);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }, [index, query]);
  

  // Carrega os produtos do banco ou API
  useEffect(() => {
    fetchProdutos();
  }, [index, query, fetchProdutos]);

  

  // Use o hook para detectar o tamanho da tela
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const isSmallScreen = useMediaQuery('(max-width: 640px)');

  return (
    <>
      <h2 className='font-bold text-xl text-gray pl-5 lg:pl-200'>Produtos em Promoção</h2>
      <div className='bg-[#B5B5B5] h-[2px] w-auto my-2 mx-6 lg:mx-[12rem]'></div>
      <div className="custom-margins">
        <Swiper
          modules={[Navigation, Pagination]}
          className="swiper-custom"
          spaceBetween={10}
          slidesPerView={1} // Default for very small screens
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1,  
            },
            380: { // For smaller devices (mobile portrait)
              slidesPerView: 2,
            },
            630: { // For larger mobile screens
              slidesPerView: 3,
              spaceBetween: 20,
            },
            843: { // For larger mobile screens
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1155 : { // Tablet portrait
              slidesPerView: 4,
              spaceBetween: 30,
            },
            
            1600: { // Large desktops
              slidesPerView: 5,
              spaceBetween: 40,
            },
          }}
        >
          {produtos.map((item, index) => (
            <SwiperSlide key={index}>
              <ProductCard key={index} item={item} isLargeScreen={isLargeScreen} isSmallScreen={isSmallScreen} fetchCart={fetchCart}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ProductCarousel;
