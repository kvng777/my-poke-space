import { PokemonListRespone, PokemonDetail } from "./definitions";

export async function getPokemonList(limit: number = 24): Promise<PokemonDetail[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit}`, {
    next: { revalidate: 60},
  });

  if (!res.ok) throw new Error("Failed to catch them Pokemons!");

  const data: PokemonListRespone = await res.json();

  const detailedPokemon: PokemonDetail[] = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url, {
        next: {revalidate : 60}
      })

      if(!res.ok) throw new Error(`Failed to fetch pokemon ${pokemon.name}`);

      const detailData = await res.json();

      return {
        id: detailData.id,
        name: detailData.name,
        image: detailData.sprites.other.showdown.front_default,
      };
    })
  )

  return detailedPokemon;
}