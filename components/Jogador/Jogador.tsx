interface JogadorProps{

    nome: string
    idade: number
    golos:number
    assistencias:number
    nacionalidade: string
}




export default function Jogador({nome, idade , golos , assistencias , nacionalidade}: JogadorProps){
return(
    <h1 className="mb-10">{nome}: {idade} anos, Golos: {golos}, Assistencias: {assistencias}</h1>
)
}