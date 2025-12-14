"use client"

import { Produto } from "@/models/interfaces"
import useSWR from "swr"
import Link from "next/link"
import ProdutoDetalhe from "@/components/ProdutoDetalhe/page"
import { useParams } from "next/navigation"

const fetcher = async (url: string): Promise<Produto> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`erro: ${res.status} ${res.statusText}`)
  return res.json()
}

export default function ProdutoPage() {
  const params = useParams()
  const id = params?.id ? String(params.id) : ""

  const url = id ? `https://deisishop.pythonanywhere.com/products/${id}` : null
  const { data, error, isLoading } = useSWR<Produto>(url, fetcher)

  if (error) return <p>{(error as Error).message}</p>
  if (isLoading || !data) return <p>A carregar produto...</p>

  return (
    <div className="space-y-4">
      <Link href="/produtos" className="px-4 py-2 bg-gray-200 rounded-lg inline-block">
        Voltar
      </Link>

      <ProdutoDetalhe produto={data} />
    </div>
  )
}