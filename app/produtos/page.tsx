"use client"

import { Produto } from "@/models/interfaces"
import useSWR from "swr"
import ProdutoCard from "@/components/ProdutoCard/Page"
import { useEffect, useState } from "react"

const fetcher = async (url: string): Promise<Produto[]> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`erro: ${res.status} ${res.statusText}`)
  return res.json()
}

export default function DEISIProdutosPage() {
  const url = "https://deisishop.pythonanywhere.com/products"
  const { data, error, isLoading } = useSWR<Produto[]>(url, fetcher)

  const [search, setSearch] = useState("")
  const [order, setOrder] = useState("nome_asc")
  const [filteredData, setFilteredData] = useState<Produto[]>([])

  const [cart, setCart] = useState<Produto[]>([])

  const [student, setStudent] = useState(false)
  const [coupon, setCoupon] = useState("")
  const [buying, setBuying] = useState(false)
  const [buyError, setBuyError] = useState("")
  const [buyResult, setBuyResult] = useState<any>(null)

  useEffect(() => {
    const raw = localStorage.getItem("cart")
    if (!raw) return
    try {
      setCart(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  function adicionarAoCarrinho(produto: Produto) {
    setCart((prev) => (prev.some((p) => p.id === produto.id) ? prev : [...prev, produto]))
  }

  function removerDoCarrinho(id: number) {
    setCart((prev) => prev.filter((p) => p.id !== id))
  }

  useEffect(() => {
    if (!data) return

    const termo = search.toLowerCase()

    let lista = data.filter((produto) => produto.title.toLowerCase().includes(termo))

    lista = lista.slice().sort((a, b) => {
      if (order === "nome_asc") return a.title.localeCompare(b.title)
      if (order === "nome_desc") return b.title.localeCompare(a.title)
      if (order === "preco_asc") return Number(a.price) - Number(b.price)
      return Number(b.price) - Number(a.price)
    })

    setFilteredData(lista)
  }, [search, data, order])

  const total = cart.reduce((acc, p) => acc + Number(p.price), 0)

  function comprar() {
    setBuyError("")
    setBuyResult(null)
    setBuying(true)

    fetch("https://deisishop.pythonanywhere.com/buy", {
      method: "POST",
      body: JSON.stringify({
        products: cart.map((p) => p.id),
        name: "",
        student: student,
        coupon: coupon,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
      })
      .then((response) => {
        setBuyResult(response)
        setCart([])
        localStorage.setItem("cart", "[]")
        setCoupon("")
        setStudent(false)
      })
      .catch((e) => {
        setBuyError(e.message || "Erro ao processar a compra")
      })
      .finally(() => {
        setBuying(false)
      })
  }

  if (error) return <p>{(error as Error).message}</p>
  if (isLoading || !data) return <p>A carregar produtos ....</p>

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Produtos DEISI</h1>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar por nome..."
          className="border rounded-md p-2 mb-4 w-full max-w-md"
        />

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="border rounded-md p-2 mb-6 w-full max-w-md"
        >
          <option value="nome_asc">Nome (A-Z)</option>
          <option value="nome_desc">Nome (Z-A)</option>
          <option value="preco_asc">Preço (crescente)</option>
          <option value="preco_desc">Preço (decrescente)</option>
        </select>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredData.map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} onAdicionar={adicionarAoCarrinho} />
          ))}
        </div>

        {filteredData.length === 0 ? <p className="mt-6">Sem resultados.</p> : null}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Carrinho</h2>

        <p className="mb-4 font-bold">Total: €{total.toFixed(2)}</p>

        {cart.length === 0 ? (
          <p>Carrinho vazio.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cart.map((produto) => (
                <ProdutoCard key={produto.id} produto={produto} onRemover={removerDoCarrinho} />
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={student}
                  onChange={(e) => setStudent(e.target.checked)}
                />
                Estudante DEISI
              </label>

              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Cupão de desconto"
                className="border rounded-md p-2 w-full max-w-md"
              />

              <button
                onClick={comprar}
                disabled={buying || cart.length === 0}
                className="px-6 py-2 bg-black text-white rounded-lg disabled:opacity-50"
              >
                {buying ? "A comprar..." : "Comprar"}
              </button>

              {buyError ? <p className="text-red-600">{buyError}</p> : null}

              {buyResult ? (
                <pre className="bg-white border rounded-lg p-4 overflow-auto">
                  {JSON.stringify(buyResult, null, 2)}
                </pre>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  )
}