"use client";

import { useEffect, useState } from "react";

export interface PokemonType {
  name: string;
  url: string;
}

export function usePokemonTypes() {
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTypes = async () => {
      setLoading(true);
      const res = await fetch("https://pokeapi.co/api/v2/type");
      const data = await res.json();
      setTypes(data.results);
      setLoading(false);
    };

    loadTypes();
  }, []);

  return { types, loading };
}
