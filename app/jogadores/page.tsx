"use client"

import { useEffect, useState } from "react"
import Jogador from "@/components/Jogador/Jogador"
import JogadoresPorto from "@/app/data/jogadores.json"
import { JogadorInterface } from "@/models/interfaces"
import Link from 'next/link'

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
  const [gosto, setGosto ] = useState(()=>{

        const gostoStored = localStorage.getItem('gosto')
        return gostoStored? Number(gostoStored) : 0
     })
 function aumentargosto(){
        setGosto(gosto+1)
     }




  return (
    <>
      <h1>Jogadores do Porto:</h1>

      {JogadoresPorto.length == 0 && <p>Nenhum jogador encontrado</p>}

     

      {JogadoresPorto.map((a,index) => (
        <div>
        <Link href={`/jogadores/${index}`}>
        <Jogador
          key={a.nome}
          nome={a.nome}
          idade={a.idade}
          golos={a.golos}
          assistencias={a.assistencias}
          nacionalidade={a.nacionalidade}
          
        />
        
        </Link>
         <p>O quanto eu gosto do jogador: {gosto}</p>

         <button onClick={aumentargosto}

         > gosto

         </button>
        </div>
        
      ))}


      
    </>
  )
} 