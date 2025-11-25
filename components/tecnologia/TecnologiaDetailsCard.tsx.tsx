import Image from 'next/image';
import Link from 'next/link';

interface TecnologiaProps {
  index: number;
  title: string;
  image: string;
  description: string;
  rating: number;
}

export default function Tecnologia({ index, title, image, description, rating }: TecnologiaProps) {
  return (
    <div className="bg-white border p-6 rounded-xl shadow-lg w-64 flex flex-col items-center text-center hover:scale-105 transition-transform">
      <Image 
        src={`/tecnologias/${image}`}   // usa o nome vindo do JSON (ex: "html.svg")
        alt={title} 
        width={80} 
        height={80} 
      />

      <h3 className="text-xl font-bold mt-4">{title}</h3>
      <p className="text-gray-600 text-sm my-2">{description}</p>
      <div className="text-yellow-500 font-bold">Rating: {rating} ★</div>

     
      <Link 
        href={`/tecnologias/${index}`} 
        className="mt-3 underline text-blue-600"
      >
        Ver detalhes
      </Link>
    </div>
  );
}