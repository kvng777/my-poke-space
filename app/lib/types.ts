export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetailResponse {
  name: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    front_default: string | null;
  };
}

export interface PokemonWithTypes {
  name: string;
  types: string[];
  image: string | null;
}

export interface TypeListResponse {
  results: {
    name: string;
    url: string;
  }[];
}
