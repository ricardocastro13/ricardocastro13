"use client"

import { useParams } from "next/navigation"
import JogadoresPorto from "@/app/data/jogadores.json"
import Link from 'next/link'

export default function JogadoresInfo(){

    const params = useParams()
    const index = Number(params.jogadores)


    return(
        <>
        <h1 className="p-5 rounded-xl flex flex-col items-center ">Informaçao sobre o jogador</h1>

        <h2>{JogadoresPorto[index].nome}</h2>

        <p>Golos na epoca:{JogadoresPorto[index].golos}</p>
        <p>Assistencias na epoca:{JogadoresPorto[index].assistencias}</p>
        <p>Posição:{JogadoresPorto[index].posicao}</p>
        <p>Idade:{JogadoresPorto[index].idade}</p>
        <p>Nacionalidade:{JogadoresPorto[index].nacionalidade}</p>

        <Link href={`/jogadores`}>voltar</Link>
        
        </>
    )
}