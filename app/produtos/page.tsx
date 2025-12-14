"use client";



import { Produto } from "@/models/interfaces";
import useSWR from "swr";


const fetcher = async (url: string): Promise<Produto[]> => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`erro: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

export default function DEISIProdutosPage() {
  const url = "https://deisishop.pythonanywhere.com/products";

  const { data, error, isLoading } = useSWR<Produto[]>(url, fetcher);
  

  if (error) return <p>{(error as Error).message}</p>;
  if (isLoading || !data) return <p>A Carregar produtos</p>;

   return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Produtos DEISI</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((produto) => (
          <div
            key={produto.id}
            className="bg-white border p-6 rounded-xl shadow-lg w-64 flex flex-col items-center text-center hover:scale-105 transition-transform"
          >
            <img
              src={`https://deisishop.pythonanywhere.com${produto.image}`}
              alt={produto.title}
              className="w-32 h-32 object-contain mb-4"
            />

            <h3>{produto.title}</h3>
            <p>{produto.category}</p>

            <p className="text-yellow-500 font-bold mt-3">
              €{produto.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
