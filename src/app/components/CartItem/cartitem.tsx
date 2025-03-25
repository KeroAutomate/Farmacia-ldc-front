import { FaRegTrashAlt } from "react-icons/fa";
import { edit_product_cart_quantity, remove_product_cart } from "../../../../services/API/cartApi";
import Image from "next/image";
export const runtime = 'edge';

export interface CartItemProps {
  product: string;
  price: number;
  addItemToCart: (item: CartItemProps) => void;
  removeItemFromCart: (item: CartItemProps) => void;
  image: string;
  idUser: string;
  idProduct: string;
  fetchCart: () => void,
  quantity: number;
}

export default function CartItem({ product, price, image, idUser, idProduct, fetchCart, quantity}: CartItemProps){
  const handle_delete_product = async () => {
    try {
      await remove_product_cart(idUser, idProduct);
      console.log('Produto removido do carrinho');
      fetchCart(); // Atualiza o carrinho após a exclusão do produto
    } catch (error) {
      console.error('Erro ao remover produto do carrinho:', error);
    }
  };

  const handle_edit_quantity = async (quantity: number) => {
    try {
      await edit_product_cart_quantity(idUser, idProduct, quantity);
      fetchCart();
    } catch (error) {
      console.error('Erro ao editar quantidade do produto no carrinho:', error);
    }
  }

  return (
    <div className="flex flex-col mb-4">
      <div className="flex flex-row items-center">
        <div className="flex-shrink-0 w-24 h-20  lg:w-36 lg:h-28 items-center justify-center">
          <Image
            src={image}
            alt={product}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="ml-4 flex-grow">
          <span title={product} className="block font-semibold text-base">
            {product}
          </span>
          <div className="flex flex-row items-center mt-2">
            <div className="flex items-center">
            <button
                className={`p-3 w-8 h-8 flex items-center justify-center rounded-lg ${quantity <= 1 ? 'bg-[#00ABDD] text-gray-700 cursor-not-allowed' : 'bg-[#00ABDD] text-white'}`}
                onClick={() => handle_edit_quantity(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="flex items-center justify-center px-4">{quantity}</span>
              <button
                className="bg-[#00ABDD] text-white p-3 w-8 h-8 flex items-center justify-center rounded-lg"
                onClick={() => handle_edit_quantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button className="hover:text-red-500 p-[0.2em] ml-4 w-auto h-8 flex items-center justify-center rounded-lg" onClick={handle_delete_product}>
              <FaRegTrashAlt size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="font-bold text-xl mt-2 ml-6">
        <span>{(price * quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
      </div>
      <div className="bg-[#B5B5B5] h-[2px] w-auto my-2"></div>
    </div>
  );
}
