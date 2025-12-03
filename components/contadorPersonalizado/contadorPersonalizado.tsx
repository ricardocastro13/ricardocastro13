"use client";

import { useEffect, useState } from "react";

type ContadorPersonalizadoProps = {
  title: string;
};

export default function ContadorPersonalizado({
  title,
}: ContadorPersonalizadoProps) {
  const [likes, setLikes] = useState(0);

  
  const storageKey = `likes_${title}`;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const salvo = window.localStorage.getItem(storageKey);
    if (salvo !== null) {
      const n = Number(salvo);
      if (!Number.isNaN(n)) {
        setLikes(n);
      }
    }
  }, [storageKey]);

  function handleClick() {
    setLikes((anterior) => {
      const novo = anterior + 1;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, String(novo));
      }
      return novo;
    });
  }

  return (
    <button
      onClick={handleClick}
      className="mt-2 rounded-xl border px-3 py-1 text-sm"
    >
      👍 Likes: {likes}
    </button>
  );
}