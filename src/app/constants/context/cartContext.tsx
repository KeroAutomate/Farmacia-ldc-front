"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definindo o tipo para os itens do carrinho
interface CartItem {
id: number;
name: string;
price: number;
quantity: number;
}

// Definindo o tipo do contexto
interface CartContextType {
cartItems: CartItem[];
addItemToCart: (item: CartItem) => void;
removeItemFromCart: (id: number) => void;
}

// Criando o valor inicial como undefined para prevenir erros de uso antes do provider
const CartContext = createContext<CartContextType | undefined>(undefined);

// Definindo as props do provider, onde "children" é ReactNode
interface CartProviderProps {
children: ReactNode;
}

// Provider do contexto
export const CartProvider = ({ children }: CartProviderProps) => {
const [cartItems, setCartItems] = useState<CartItem[]>([]);

const addItemToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
};

const removeItemFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
};

const value = {
    cartItems,
    addItemToCart,
    removeItemFromCart
};

return (
    <CartContext.Provider value={value}>
    {children}
    </CartContext.Provider>);
};

// Custom hook para acessar o contexto
export const useCart = () => {
const context = useContext(CartContext);
if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
}
return context;
};
