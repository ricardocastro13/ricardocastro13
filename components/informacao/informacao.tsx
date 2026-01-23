interface FilmesProps{

  id: number
  titulo: string
  ano: number
  genero:string
  nota: number


}

export default function  informacao( {id , titulo , ano , genero , nota} : FilmesProps){
  return(

    <h1>{titulo} : {ano},  nota {nota} </h1>

  )
  
  
  
  
  





}