"use client";

import { useEffect, useState } from "react";

export default function Relogio() {
  const [hora, setHora] = useState<string>("");

  useEffect(() => {
    const id = setInterval(() => {
      setHora(new Date().toLocaleTimeString());
    }, 1000);

    // cleanup – para parar o intervalo quando o componente sai da página
    return () => clearInterval(id);
  }, []);

  return <span>{hora}</span>;
}