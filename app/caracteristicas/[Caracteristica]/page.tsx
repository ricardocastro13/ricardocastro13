import Link from "next/link";

interface CaracteristicaPageProps {
  params: { caracteristica: string };
}

export default function CaracteristicaPage({ params }: CaracteristicaPageProps) {
  const caracteristicas = [
    "Componentes, funções que retornam JSX.",
    "Componentes Reutilizáveis e Modulares.",
    "Roteamento Automático e APIs.",
    "Hooks: useState, useEffect e useSWR.",
    "Renderização Rápida e SEO Friendly.",
    "TypeScript Seguro e Escalável.",
    "Comunidade Ativa e Popularidade."
  ];

  const index = Number(params.caracteristica);
  const texto = caracteristicas[index];

  if (!texto) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p>Característica não encontrada.</p>
          <Link href="/caracteristicas" className="underline text-blue-600">
            Voltar às características
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-xl">
        <h2 className="text-2xl font-bold mb-4">Característica</h2>
        <p className="mb-6">{texto}</p>
        <Link href="/caracteristicas" className="underline text-blue-600">
          Voltar às características
        </Link>
      </div>
    </div>
  );
}