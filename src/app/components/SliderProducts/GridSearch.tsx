'use client';
import 'swiper/css/bundle';
import './Slider.css';
import { useCallback, useEffect, useState } from 'react';
import { getAllProducts } from '../../../../services/API/productApi';
import { Iproduct } from '../../../../services/productServices';
import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import ProductCard from '../ProductCard';
export const runtime = 'edge';

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

interface GridSearchProps {
  searchword: string;
  fetchCart: () => void;
}

const GridSearch = ({ searchword, fetchCart }: GridSearchProps) => {
  const [numberOfPages, setNumberOfPages] = useState<number>(0); // Número de páginas
  const [query] = useState<string>(""); // Valor usado na busca
  const [index, setIndex] = useState<number>(1); // Cursor para paginação
  const [produtos, setProdutos] = useState<Iproduct[]>([]); // Lista de produtos


  const fetchProdutos = useCallback(async () => {
    try {
      const produto = await getAllProducts(index, searchword); // Inclua o `search` como parâmetro
      if (produto) {
        setProdutos(produto.data);
        setNumberOfPages(produto.totalPages);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }, [index, searchword]);
  

  // Carrega os produtos do banco ou API
  useEffect(() => {
    fetchProdutos();
  }, [index, query, searchword, fetchProdutos]); 


  const handleNextPage = () => {
    setIndex(index+1)
  };

  const handlePreviousPage = () => {
    setIndex(index-1)
  };


  // Use o hook para detectar o tamanho da tela
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const isSmallScreen = useMediaQuery('(max-width: 640px)');

  return (
    <>
      {
        produtos.length === 0
        ?
        (
          <>
            <h2 className='font-bold text-xl text-gray pl-5 lg:pl-200 mt-24'>Nenhum resultado para a pesquisa</h2>
            <h3 className='font-bold text-base text-gray pl-5 lg:pl-200 mt-4'>Verifique se a palavra está escrita corretamente</h3>
          </>
        )
        :
          <h2 className='font-bold text-xl text-gray pl-5 lg:pl-200 mt-24 '>Resultado da pesquisa</h2>

      }
      
      <div className="mt-8">
        <div
          className="grid-container custom-margins"
        >

          {produtos.map((item, index) => (
            <ProductCard key={index} item={item} isLargeScreen={isLargeScreen} isSmallScreen={isSmallScreen} fetchCart={fetchCart}/>
          ))}
        </div>
        {
          numberOfPages > 1 && (
            <div className="mt-full flex gap-4 items-center justify-center py-4">
              <button 
                className={`text-xs font-bold p-2 rounded-lg ${index == 1 ? 'cursor-not-allowed bg-[#00ABDD] text-black' : 'bg-[#00ABDD] text-white'}`}
                onClick={handlePreviousPage} 
                disabled={index == 1}
              >
                <FaArrowLeft/>
                
              </button>
              <span className="text-black font-semibold">{index}/{numberOfPages}</span>
              <button 
                className={`text-xs font-bold p-2 rounded-lg ${index == numberOfPages ? 'cursor-not-allowed bg-[#00ABDD] text-black' : 'bg-[#00ABDD] text-white'}`}
                onClick={handleNextPage} 
                disabled={index == numberOfPages}
              >
                <FaArrowRight/>
              </button>
            </div>
          )

        }
      </div>
    </>
  );
};

export default GridSearch;
