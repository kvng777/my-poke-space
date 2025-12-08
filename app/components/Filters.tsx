"use client";

import { usePokemonTypes } from "../lib/hooks/usePokemonTypes";

interface Props {
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
}

export default function FilterGroup({ selectedTypes, setSelectedTypes }: Props) {
  const { types } = usePokemonTypes();

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <section className="flex flex-wrap gap-x-6 gap-y-3 items-center">
      <p>Types: </p>
      {types.map((t) => (
        <button
          key={t.name}
          onClick={() => toggleType(t.name)}
          className={`border border-gray-300 p-4 cursor-pointer ${selectedTypes.includes(t.name) && 'bg-blue-500 text-white'}`}
        >
          {t.name}
        </button>
      ))}
    </section>
  );
}
