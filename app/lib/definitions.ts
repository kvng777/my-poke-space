export interface PokemonListResult {
  name: string;
  url: string;
}

export interface PokemonListRespone {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListResult[];
}

export interface PokemonDetail {
  id: number,
  name: string,
  image: string,
}

