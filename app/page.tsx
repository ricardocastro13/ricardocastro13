
import MagiaDoJSX from '@/components/MagiaDoJSX';
import Link from 'next/link';
export default function Page() {
  return (
    <div>
      <h2>Interfaces Modernos</h2>
      <p>Bem vindo à minha app em React e Next.js.</p>
      <MagiaDoJSX />

      
      <Link href="/counter">
        Counter
      </Link>
    </div>
  )
}