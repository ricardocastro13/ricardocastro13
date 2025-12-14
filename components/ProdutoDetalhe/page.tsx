"use client"

import { Produto } from "@/models/interfaces"

export default function ProdutoDetalhe({ produto }: { produto: Produto }) {
  const img = produto.image.startsWith("http")
    ? produto.image
    : `https://deisishop.pythonanywhere.com${produto.image}`

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{produto.title}</h1>

      <img
        src={img}
        alt={produto.title}
        className="w-48 h-48 object-contain"
      />

      <p><span className="font-bold">Categoria:</span> {produto.category}</p>
      <p><span className="font-bold">Preço:</span> €{Number(produto.price).toFixed(2)}</p>

      <p className="mt-4">{produto.description}</p>

      <p className="mt-2">
        <span className="font-bold">Rating:</span> {produto.rating.rate} ({produto.rating.count})
      </p>
    </div>
  )
}