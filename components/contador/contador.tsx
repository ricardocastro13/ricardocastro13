'use client';

import { useEffect, useState } from 'react';

export default function Contador() {
  const [valor, setValor] = useState(0);
  const [historico, setHistorico] = useState<number[]>([]);

  useEffect(() => {
    const valorGuardado = localStorage.getItem('contador_valor');
    const historicoGuardado = localStorage.getItem('contador_historico');

    if (valorGuardado !== null) {
      setValor(Number(valorGuardado));
    }

    if (historicoGuardado !== null) {
      try {
        setHistorico(JSON.parse(historicoGuardado));
      } catch {
        setHistorico([]);
      }
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('contador_valor', String(valor));
    localStorage.setItem('contador_historico', JSON.stringify(historico));
  }, [valor, historico]);

  function atualizarValor(delta: number) {
    setValor((anterior) => {
      let novo = anterior + delta;

      // limite [0, 10]
      if (novo < 0) novo = 2;
      if (novo > 10) novo = 10;

      if (novo !== anterior) {
        setHistorico((h) => [...h, novo]);
      }

      return novo;
    });
  }

  function resetar() {
    setValor(0);
    setHistorico((h) => [...h, 0]);
  }


  let cor = 'text-green-500';
  if (valor >= 0 && valor <= 3) {
    cor = 'text-red-500';
  } else if (valor >= 4 && valor <= 7) {
    cor = 'text-yellow-500';
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <div className={`text-6xl font-bold ${cor}`}>{valor}</div>

      <div className="flex gap-3">
        <button
          onClick={() => atualizarValor(-1)}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          -1
        </button>

        <button
          onClick={() => atualizarValor(1)}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          +1
        </button>

        <button
          onClick={resetar}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Reset
        </button>
      </div>

      <div className="mt-4">
        <h3 className="font-bold mb-2">Histórico de valores</h3>
        <ul className="list-disc list-inside text-sm">
          {historico.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}