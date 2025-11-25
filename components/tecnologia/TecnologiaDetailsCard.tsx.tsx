import Image from "next/image";

interface TecnologiaDetailsCardProps {
  title: string;
  image: string;
  description: string;
  rating: number;
}

export default function TecnologiaDetailsCard({
  title,
  image,
  description,
  rating,
}: TecnologiaDetailsCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl text-center mx-auto flex flex-col items-center">
      <Image
        src={`/tecnologias/${image}`}
        alt={title}
        width={120}
        height={120}
        className="mb-4"
      />

      <h2 className="text-3xl font-bold mb-2">{title}</h2>

      <p className="text-gray-700 mb-4">{description}</p>

      <p className="text-yellow-500 font-bold text-xl">
        Rating: {rating} ★
      </p>
    </div>
  );
}