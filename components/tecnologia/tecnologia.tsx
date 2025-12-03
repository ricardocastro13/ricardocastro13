import Image from "next/image";
import ContadorPersonalizado from "@/components/contadorPersonalizado/contadorPersonalizado";

interface TecnologiaProps {
  title: string;
  image: string;
  description: string;
  rating: number;
}

export default function Tecnologia({ title, image, description, rating }: TecnologiaProps) {
  return (
    <div className="bg-white border p-6 rounded-xl shadow-lg w-64 flex flex-col items-center text-center hover:scale-105 transition-transform">
      <Image src={image} alt={title} width={80} height={80} />
      <h3 className="text-xl font-bold mt-4">{title}</h3>
      <p className="text-gray-600 text-sm my-2">{description}</p>
      <div className="text-yellow-500 font-bold mt-auto">Rating: {rating} ★</div>
      <ContadorPersonalizado title={title} />
    </div>
  );
}