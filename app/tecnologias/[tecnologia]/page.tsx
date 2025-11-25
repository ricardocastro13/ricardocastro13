import tecnologias from '@/app/data/tecnologias.json';
import TecnologiaDetailsCard from '@/components/tecnologia/TecnologiaDetailsCard.tsx';
import Link from 'next/link';

interface TecnologiaPageProps {
  params: { tecnologia: string };
}

export default function TecnologiaPage({ params }: TecnologiaPageProps) {
  const index = Number(params.tecnologia);
  const tecnologia = tecnologias[index];

  if (!tecnologia) {
    return (
      <div className="p-10 text-center">
        <p>Tecnologia não encontrada.</p>
        <Link href="/tecnologias" className="underline text-blue-600">
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-10">
      <TecnologiaDetailsCard
        title={tecnologia.title}
        image={tecnologia.image}
        description={tecnologia.description}
        rating={tecnologia.rating}
      />

      <Link href="/tecnologias" className="mt-6 underline text-blue-600">
        Voltar
      </Link>
    </div>
  );
}