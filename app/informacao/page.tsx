"use client"

import { useState } from "react"
import Informacao from "@/components/informacao/informacao"
import Filmes from "@/app/data/informacao.json"

export default function Page() {
  const [ordem, setOrdem] = useState("ano-desc")
  const[Ano,SetAno]= useState("todos")



  const FilmesAno = Filmes.filter((a)=>{

    if(Ano === "2000") return a.ano<=2000
    if(Ano === "2100") return a.ano>2000
    return true
  })
  
  const filmesFinal = [...FilmesAno].sort((a, b) => {
    if (ordem === "ano-asc") return a.ano - b.ano
    if (ordem === "ano-desc") return b.ano - a.ano
    if (ordem === "nota-asc") return a.nota - b.nota
    return b.nota - a.nota
  })

  

  return (
    <>
    <select value={Ano} onChange={(e) => SetAno(e.target.value)}>

        <option value="todos">Todos</option>
        <option value="2000">seculo 20</option>
        <option value="2100">seculo 21</option>

        </select>

      <select value={ordem} onChange={(e) => setOrdem(e.target.value)}>
        <option value="ano-desc">Ano: descendente</option>
        <option value="ano-asc">Ano: ascendente</option>
        <option value="nota-desc">Nota: descendente</option>
        <option value="nota-asc">Nota: ascendente</option>
      </select>

      


      

      

      {filmesFinal.map((x) => (
        <Informacao
          key={x.id}
          id={x.id}
          titulo={x.titulo}
          ano={x.ano}
          genero={x.genero}
          nota={x.nota}
        />
      ))}
    </>
  )
}
