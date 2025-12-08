"use client";

import { useEffect, useState } from "react";
import { fetchPokemons, Pokemon } from "../actions";

async function fetchByType(type: string): Promise<Pokemon[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await res.json();
  return data.pokemon.map((p: any) => ({
    name: p.pokemon.name,
    url: p.pokemon.url
  }));
}

async function fetchPokemonDetails(url: string): Promise<Pokemon> {
  try {
    const res = await fetch(url);
    const data = await res.json();

    return {
      name: data.name,
      url,
      id: data.id || 0,
      image: data.sprites?.other?.showdown?.front_default || data.sprites?.front_default || ''
    };
  } catch (err) {
    const parts = url.split("/").filter(Boolean);
    const name = parts[parts.length - 1] || '';
    const idMatch = url.match(/\/(\d+)\//);
    const id = idMatch ? parseInt(idMatch[1], 10) : 0;
    return { name, url, id, image: '' };
  }
}

export function usePokemons(currentPage: number, selectedTypes: string[], limit = 24) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNext, setHasNext] = useState<string | null>(null);
  const [hasPrev, setHasPrev] = useState<string | null>(null);
  const [hasCount, setHasCount] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      if (selectedTypes.length === 0) {
        const offset = (currentPage - 1) * limit;
        const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

        const data = await fetchPokemons(apiUrl);

        // fetch details for each pokemon in parallel
        const detailed = await Promise.all(
          data.results.map((r: Pokemon) => fetchPokemonDetails(r.url))
        );

        setPokemons(detailed);
        setLoading(false);
        setHasNext(data.next);
        setHasPrev(data.previous);
        setHasCount(data.count);
        return;
      }

      // fetch all types in parallel
      const allTypeRequests = await Promise.all(
        selectedTypes.map((type) => fetchByType(type))
      );

      // intersection (AND logic)
      const intersection = allTypeRequests.reduce<Pokemon[]>((acc, list) => {
        if (acc.length === 0) return list;
        return acc.filter((p1) => list.some((p2) => p2.name === p1.name));
      }, []);

      // client-side pagination
      const start = (currentPage - 1) * limit;
      const end = start + limit;
      const pageSlice = intersection.slice(start, end);

      // fetch details for the slice in parallel
      const detailedSlice = await Promise.all(pageSlice.map((p) => fetchPokemonDetails(p.url)));

      setPokemons(detailedSlice);
      setLoading(false);
    };

    load();
  }, [currentPage, selectedTypes, limit]);

  return { pokemons, loading, hasNext, hasPrev, hasCount };
}

