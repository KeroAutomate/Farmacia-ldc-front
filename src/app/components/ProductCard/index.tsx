import Image from 'next/image';
import { useEffect, useState } from 'react';
import { addProductToCart } from '../../../../services/API/cartApi';
export const runtime = 'edge';

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

interface ProductCardProps {
  item: {
    id: string;
    imagem: string;
    nome: string;
    quantidade: number;
    preco: number;
  };
  isLargeScreen: boolean;
  isSmallScreen: boolean;
  fetchCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, isLargeScreen, isSmallScreen, fetchCart }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user) {
      const userData = JSON.parse(user);
      setUserId(userData.id);
    }
  }, []);

  const handleAddToCart = async () => {
    try {
      await addProductToCart(userId, item.id, 1);
      setIsAdded(true);
      fetchCart(); // Chama a função fetchCart para atualizar o carrinho
      setTimeout(() => {
        setIsAdded(false);
      }, 2000); // Volta ao estado original após 2 segundos
    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg text-center bg-white shadow-md w-[175px] h-[290px] lg:w-[240px] lg:h-[360px] flex flex-col justify-between p-4 mb-10 mx-auto">
      {item.imagem ? (
        <Image
          src={item.imagem}
          alt={item.nome}
          className="mx-auto mb-[-1rem] select-none h-[100px] lg:h-[160px]"
        />
      ) : (
        <span className="text-gray-500 italic">Sem imagem</span>
      )}
      <div className="discount-tag bg-[#00ABDD]-800 text-white text-sm font-bold rounded-md mb-2 p-1"></div>
      <h3 className="text-sm mb-1 text-gray-800">
        {isLargeScreen
          ? truncateText(item.nome, 50)
          : isSmallScreen
          ? truncateText(item.nome, 20)
          : truncateText(item.nome, 30)}
      </h3>
      <p className="text-xs text-gray-600">
        {
          item.quantidade > 10 ? 
          'Em estoque' :
          'Quase acabando!'
        }
      </p>
      <div className="price text-lg font-bold text-[#00ABDD]-800 mb-2">
        {item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} <span className="text-xs text-gray-600">(cada)</span>
      </div>
      <button
        className={`add-cart-button ${isAdded ? 'bg-green-500' : 'bg-[#00ABDD]'} text-white p-2 rounded-md w-full cursor-pointer flex justify-center items-center text-sm font-bold hover:bg-[#00ABDD]-700`}
        onClick={handleAddToCart}
      >
        {isAdded ? 'ADICIONADO' : 'ADICIONAR'}
        <i className="ml-1">
          <Image
            src="/cartProduct.svg"
            alt="Carrinho"
            width={15}
            height={13}
          />
        </i>
      </button>
    </div>
  );
};

export default ProductCard;