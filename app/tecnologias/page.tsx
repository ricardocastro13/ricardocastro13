import tecnologias from '@/app/data/tecnologias.json';
import Tecnologia from '@/components/tecnologia/tecnologia';

export default function TecnologiasPage() {
  return (
    <div >
      <h2> Tecnologias Exploradas</h2>

      <div>
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