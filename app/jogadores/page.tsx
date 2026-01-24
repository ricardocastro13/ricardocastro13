"use client"

import { useEffect, useState } from "react"
import Jogador from "@/components/Jogador/Jogador"
import JogadoresPorto from "@/app/data/jogadores.json"
import { JogadorInterface } from "@/models/interfaces"

export default function Page() {
  
  //estados para os filtros
  const [posicao, setPosicao] = useState("todos")
  const [estatistica, setEstatistica] = useState("MenosGolos")
  const [pais, setPais] = useState("todos")
  const [jogadores, setJogadores] = useState<JogadorInterface[]>([])

  //EFEITOS
  useEffect(() => {
    setJogadores(JogadoresPorto)
  }, [])
  
  useEffect (
    () => {
      JogadoresPorto.filter((p)=>{
      p.nacionalidade === pais
})
    },[pais])



  const nacionalidades = Array.from(new Set(JogadoresPorto.map((j) => j.nacionalidade)))


  const jogadoresFiltrados = JogadoresPorto.filter((p) => {
    if (pais !== "todos" && p.nacionalidade !== pais) return false
    if (posicao === "todos") return true
    if (posicao === "redes") return p.posicao === "Guarda-Redes"
    if (posicao === "defesa") return p.posicao === "Defesa"
    if (posicao === "medio") return p.posicao === "Médio"
    if (posicao === "avancado") return p.posicao === "Avançado"
    return true
  })

  const JogadoresFinal = [...jogadoresFiltrados].sort((a, b) => {
    if (estatistica === "MenosGolos") return a.golos - b.golos
    if (estatistica === "MaisGolos") return b.golos - a.golos
    if (estatistica === "MenosAssistencia") return a.assistencias - b.assistencias
    if (estatistica === "MaisAssistencia") return b.assistencias - a.assistencias
    if (estatistica === "MenosIdade") return b.idade - a.idade
    return a.idade - b.idade

  }
  )

  return (
    <>
      <h1>Jogadores do Porto:</h1>

      <select value={pais} onChange={(e) => setPais(e.target.value)}>
        <option value="todos">todas as nacionalidades</option>
        <option value="Portugal">Portugal</option>
        <option value="Brasil">Brasil</option>
        <option value="Espanha">Espanha</option>
        <option value="Argentina">Argentina</option>
        <option value="Polónia">Polónia</option>
        <option value="Dinamarca">Dinamarca</option>
        <option value="República Dominicana">República Dominicana</option>
        <option value="Canadá">Canadá</option>
        <option value="Nigéria">Nigéria</option>
        <option value="Croácia">Croácia</option>
        <option value="Países Baixos">Países Baixos</option>
        <option value="Turquia">Turquia</option>

      </select>


      <select value={posicao} onChange={(e) => setPosicao(e.target.value)}>
        <option value="todos">todas as posições</option>
        <option value="redes">guarda-redes</option>
        <option value="defesa">defesa</option>
        <option value="medio">médio</option>
        <option value="avancado">avançado</option>
      </select>

      <select value={estatistica} onChange={(e) => setEstatistica(e.target.value)}>
        <option value="MaisGolos">mais golos</option>
        <option value="MenosGolos">menos golos</option>
        <option value="MaisAssistencia">mais assistencias</option>
        <option value="MenosAssistencia">menos assistencias</option>
        <option value="MaisIdade">mais novo</option>
        <option value="MenosIdade">mais velho</option>


      </select>

      {JogadoresFinal.length == 0 && <p>Nenhum jogador encontrado</p>}

      {JogadoresFinal.map((a) => (
        <Jogador
          key={a.nome}
          nome={a.nome}
          idade={a.idade}
          golos={a.golos}
          assistencias={a.assistencias}
          nacionalidade={a.nacionalidade}
        />
      ))}
    </>
  )
}
