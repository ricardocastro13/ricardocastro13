import Link from "next/link";

interface ProjetoProps {
    nome: string;
    url: string;
}

export default function Projeto({ nome, url }: ProjetoProps) {
    return (
        <article className="bg-yellow-500 p-2 m-2 rounded-xl">
            <h2>{nome}</h2>
            <p>
                explore o projeto {nome} no seguinte link
                <Link href={url} className="underline"
                target="_blank">
                 link</Link>
            </p>
        </article>
    )
}