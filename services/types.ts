// types.ts
export interface Produto {
    id: string;
    nome: string;
    preco: number;
    quantidade: number;
  }
  
  export interface Cliente {
    id: string;
    nome: string;
    carrinho: Produto[];
  }
  