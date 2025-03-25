// mockData.ts
import { Cliente } from "./types";

export const clientes: Cliente[] = [
  {
    id: "1",
    nome: "João Silva",
    carrinho: [
      { id: "101", nome: "Produto A", preco: 50, quantidade: 2 },
      { id: "102", nome: "Produto B", preco: 30, quantidade: 1 },
    ],
  },
  {
    id: "2",
    nome: "Maria Oliveira",
    carrinho: [
      { id: "103", nome: "Produto C", preco: 20, quantidade: 3 },
      { id: "104", nome: "Produto D", preco: 40, quantidade: 1 },
    ],
  },
  {
    id: "3",
    nome: "Gabriel Pontes",
    carrinho: [
      { id: "105", nome: "Produto E", preco: 90, quantidade: 7 },
      { id: "106", nome: "Produto F", preco: 110, quantidade: 9 },
    ],
  },
];
