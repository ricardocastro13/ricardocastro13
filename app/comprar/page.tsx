"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Produto } from "@/models/interfaces"

export default function ComprarPage() {
  const [cart, setCart] = useState<Produto[]>([])
  const [student, setStudent] = useState(false)
  const [coupon, setCoupon] = useState("")
  const [name, setName] = useState("")
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

  const total = cart.reduce((acc, p) => acc + Number(p.price), 0)

  function comprar() {
    setBuyError("")
    setBuyResult(null)
    setBuying(true)

    fetch("https://deisishop.pythonanywhere.com/buy", {
      method: "POST",
      body: JSON.stringify({
        products: cart.map((p) => p.id),
        name: name,
        student: student,
        coupon: coupon,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
      })
      .then((data) => {
        setBuyResult(data)
        alert(`Compra efetuada! Referência: ${data.reference} | Total: €${data.totalCost}`)
        localStorage.setItem("cart", "[]")
        setCart([])
      })
      .catch((e) => setBuyError(e.message || "Erro ao comprar"))
      .finally(() => setBuying(false))
  }

  return (
    <div className="space-y-6">
      <Link href="/produtos" className="inline-block px-4 py-2 bg-gray-200 rounded-lg">
        Voltar aos produtos
      </Link>

      <h1 className="text-2xl font-bold">Comprar</h1>

      <p className="font-bold">Total: €{total.toFixed(2)}</p>

      {cart.length === 0 ? <p>Carrinho vazio.</p> : null}

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="O seu nome"
        className="border rounded-md p-2 w-full max-w-md"
      />

      <label className="flex items-center gap-2">
        <input type="checkbox" checked={student} onChange={(e) => setStudent(e.target.checked)} />
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
  )
}