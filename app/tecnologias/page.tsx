
import tecnologias from '@/app/data/tecnologias.json';
import Tecnologia from '@/components/tecnologia/tecnologia';

export default function TecnologiasPage() {
  return (
    <div className="flex flex-col items-center p-10">
      <h2 className="text-3xl font-bold mb-8">Tecnologias Exploradas</h2>

      <div className="flex flex-wrap justify-center gap-6">
        {tecnologias.map((tec, i) => {
          return (
            <Tecnologia
              key={i}
              title={tec.title}
              image={tec.image}
              description={tec.description}
              rating={tec.rating}
            />
          );
        })}
      </div>
    </div>
  );
}