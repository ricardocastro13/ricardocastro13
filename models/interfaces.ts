// todos os exports para ser mais facil e organizado importar em outras partes da app

export interface Produto {
  id: number;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}


export interface Rating {
  rate: number;
  count: number;
}

export interface JogadorInterface {
  nome: string;
  idade: number;
  posicao: string;
  golos: number;
  assistencias: number;
  nacionalidade: string;
}