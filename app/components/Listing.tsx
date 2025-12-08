import { Pokemon } from "../lib/actions";

interface ListingProps {
  pokemons: Pokemon[];
  loading: boolean;
}

export default function Listing({ pokemons, loading }: ListingProps) {

  return (
    loading ? <p>Loading...</p> :
    <section>
      <ul className="grid grid-cols-6 gap-16">
        {pokemons.map((pokemon) => (
          <li key={pokemon.name} className="flex flex-col items-center justify-between">
            {pokemon.name}

            {pokemon.image &&
              <img src={pokemon.image} alt={`GIF of ${pokemon.name}`} />
            }

            <p>Number: {pokemon.id}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
