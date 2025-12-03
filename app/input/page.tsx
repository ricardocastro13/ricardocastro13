"use client";

import { useState } from "react";

type Tarefa = {
  id: number;
  texto: string;
  categoria: string;
};

export default function InputPage() {
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState("React");
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [nextId, setNextId] = useState(1);

  function adicionarTarefa() {
    const t = texto.trim();
    if (!t) return;

    setTarefas((lista) => [
      ...lista,
      { id: nextId, texto: t, categoria },
    ]);
    setNextId((id) => id + 1);
    setTexto("");
  }

  function apagarTarefa(id: number) {
    setTarefas((lista) => lista.filter((t) => t.id !== id));
  }

  function editarTarefa(id: number) {
    const tarefa = tarefas.find((t) => t.id === id);
    if (!tarefa) return;

    const novoTexto = window.prompt("Novo texto da tarefa:", tarefa.texto);
    if (novoTexto === null) return; // cancelado
    setTarefas((lista) =>
      lista.map((t) =>
        t.id === id ? { ...t, texto: novoTexto } : t
      )
    );
  }

  return (
    <main className="mx-auto max-w-xl p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Input</h1>

      {/* input de texto */}
      <section className="flex flex-col gap-2">
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="border rounded px-3 py-2"
          placeholder="Escreve aqui…"
        />
        <p>Texto digitado: {texto}</p>
      </section>

      {/* seletor de tecnologias / categorias */}
      <section className="flex flex-col gap-2">
        <label>Categoria / tecnologia:</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option>React</option>
          <option>Next.js</option>
          <option>TypeScript</option>
          <option>CSS</option>
        </select>
      </section>

      {/* botão para inserir tarefa */}
      <button
        onClick={adicionarTarefa}
        className="border rounded px-4 py-2 w-fit"
      >
        Adicionar tarefa
      </button>

      {/* lista de tarefas */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Tarefas</h2>
        <ul className="flex flex-col gap-2">
          {tarefas.map((t) => (
            <li
              key={t.id}
              className="border rounded px-3 py-2 flex justify-between items-center"
            >
              <div>
                <p>{t.texto}</p>
                <small>Categoria: {t.categoria}</small>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editarTarefa(t.id)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => apagarTarefa(t.id)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  Apagar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}