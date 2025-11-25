import Projeto from '@/components/Projeto/Projeto';
import Link from 'next/link';

export default function DescricaoProjetos() {
  return (
    <>
      <h2>Projetos</h2>

      <p>Já fiz vários projetos.</p>

      <p>
        Aqui está o meu GitHub Pages:{' '}
        <Link href="https://ricardocastro13.github.io" target="_blank">
          Abrir Portfólio
        </Link>
      </p>

      <h3>Projeto em Destaque</h3>

      <Projeto
        nome="Portfólio"
        url="https://ricardocastro13.github.io"
      />
    </>
  );
}