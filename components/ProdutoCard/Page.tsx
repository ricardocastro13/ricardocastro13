"use client"

import { Produto } from "@/models/interfaces"
import Link from "next/link"

export default function ProdutoCard({
  produto,
  onAdicionar,
  onRemover,
}: {
  produto: Produto
  onAdicionar?: (p: Produto) => void
  onRemover?: (id: number) => void
}) {
  const img = produto.image.startsWith("http")
    ? produto.image
    : `https://deisishop.pythonanywhere.com${produto.image}`

  return (
    <div className="bg-white border p-6 rounded-xl shadow-lg w-64 flex flex-col items-center text-center hover:scale-105 transition-transform">
      <img src={img} alt={produto.title} className="w-32 h-32 object-contain mb-4" />

      <h3>{produto.title}</h3>
      <p>{produto.category}</p>

      <p className="text-yellow-500 font-bold mt-3">
        €{Number(produto.price).toFixed(2)}
      </p>

      <div className="mt-4 flex gap-2">
        <Link href={`/produtos/${produto.id}`} className="px-4 py-2 bg-black text-white rounded-lg">
          +info
        </Link>

        {onAdicionar ? (
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg" onClick={() => onAdicionar(produto)}>
            Adicionar
          </button>
        ) : null}

        {onRemover ? (
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg" onClick={() => onRemover(produto.id)}>
            Remover
          </button>
        ) : null}
      </div>
    </div>
  )
}