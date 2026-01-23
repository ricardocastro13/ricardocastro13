import Image from "next/image";
import ContadorPersonalizado from "@/components/contadorPersonalizado/contadorPersonalizado";


export interface TecnologiaProps {
  title: string;
  image: string;
  description: string;
  rating: number;
}


export default function Tecnologia({ title, image, description, rating }: TecnologiaProps) {
  return (
    <div >
      <Image src={image} alt={title} width={80} height={80} />
      <h3 >{title}</h3>
      <p>{description}</p>
      <div>Rating: {rating} ★</div>
      <ContadorPersonalizado title={title} />
    </div>
  );
}