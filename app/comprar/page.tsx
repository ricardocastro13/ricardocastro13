"use client"

import { useEffect, useState } from "react"
import { Produto } from "@/models/interfaces"
import Link from "next/link"

export default function ComprarPage() {
  const [cart, setCart] = useState<Produto[]>([])
  const [student, setStudent] = useState(false)
  const [coupon, setCoupon] = useState("")
  const [resposta, setResposta] = useState<any>(null)
  const [erro, setErro] = useState("")
  const [aComprar, setAComprar] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem("cart")
    if (!raw) return
    try {
      setCart(JSON.parse(raw))
    } catch {}
  }, [])

  const total = cart.reduce((acc, p) => acc + Number(p.price), 0)

  async function buy() {
    setErro("")
    setResposta(null)
    setAComprar(true)

    try {
      const res = await fetch("https://deisishop.pythonanywhere.com/products/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: cart.map((p) => p.id),
          name: "",
          student,
          coupon,
        }),
      })

      if (!res.ok) throw new Error(res.statusText)

      const json = await res.json()
      setResposta(json)
      setCart([])
      localStorage.setItem("cart", "[]")
    } catch (e) {
      setErro((e as Error).message)
    } finally {
      setAComprar(false)
    }
  }

  return (
    <div className="space-y-6">
      <Link href="/produtos" className="px-4 py-2 bg-gray-200 rounded-lg inline-block">
        Voltar
      </Link>

      <h1 className="text-2xl font-bold">Comprar</h1>

      <p className="font-bold">Total: €{total.toFixed(2)}</p>

      <label className="flex items-center gap-2">
        <input type="checkbox" checked={student} onChange={(e) => setStudent(e.target.checked)} />
        Estudante DEISI
      </label>

      <input
        className="border rounded-md p-2 w-full max-w-md"
        type="text"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        placeholder="Cupão de desconto"
      />

      <button
        className="px-6 py-2 bg-black text-white rounded-lg disabled:opacity-50"
        onClick={buy}
        disabled={cart.length === 0 || aComprar}
      >
        {aComprar ? "A comprar..." : "Comprar"}
      </button>

      {erro ? <p className="text-red-600">{erro}</p> : null}

      {resposta ? (
        <pre className="bg-white border rounded-lg p-4 overflow-auto">
          {JSON.stringify(resposta, null, 2)}
        </pre>
      ) : null}
    </div>
  )
}