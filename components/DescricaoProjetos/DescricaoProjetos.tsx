import Link from 'next/link';

export default function DescricaoProjetos() {
  return (
    <>
      <h2>Projetos</h2>
      <p>Já fiz vários projetos</p>

      <p>
        Visite o meu{' '}
        <Link href="https://ricardocastro13.github.io" >
          site
        </Link>
        .
      </p>
    </>
  );
}