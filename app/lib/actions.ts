export interface Pokemon {
  name: string;
  url: string;
  image: string;
  id: number;
}

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export const fetchPokemons = async (url: string): Promise<PokemonResponse> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch pokemons");
  return res.json();
};

