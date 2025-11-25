import Link from "next/link";

interface CaracteristicaProps {
  index: number;
  texto: string;
}

export default function Caracteristica({ index, texto }: CaracteristicaProps) {
  return (
    <li className="my-2">
      <Link
        href={`/caracteristicas/${index}`}
        className="underline text-blue-600"
      >
        {texto}
      </Link>
    </li>
  );
}