interface JogadoresProps{

    nome: string
    idade: number
    posicao: string
    golos:number
    assistencias:number
    nacionalidade: string
}


export default function Jogadores({nome, idade , posicao , golos , assistencias , nacionalidade}: JogadoresProps){
return(
    <h1 className="mb-10">{nome}: {idade} anos, Posição: {posicao}, Golos: {golos}, Assistencias: {assistencias}</h1>
)
}