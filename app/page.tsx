"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { usePokemons } from "./lib/hooks/usePokemons";
import FilterGroup from "./components/Filters";
import Listing from "./components/Listing";
import Pagination from "./components/Pagination";

export default function PokemonPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const typesFromUrl = searchParams.get("types");
  const initialTypes = typesFromUrl ? typesFromUrl.split(",").filter(Boolean) : [];
  
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialTypes);

  const updateUrl = (types: string[], page: number) => {
    const params = new URLSearchParams();
    
    if (types.length > 0) {
      params.set("types", types.join(","));
    }
    if (page > 1) {
      params.set("page", page.toString());
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : "/";
    router.replace(newUrl);
  };

  const handleTypesChange = (types: string[]) => {
    setSelectedTypes(types);
    updateUrl(types, 1);
  };

  useEffect(() => {
    const typesFromUrl = searchParams.get("types");
    const urlTypes = typesFromUrl ? typesFromUrl.split(",").filter(Boolean) : [];

    if (selectedTypes.join(",") !== urlTypes.join(",")) {
      setSelectedTypes(urlTypes);
    }
  }, [searchParams, selectedTypes]);

  const { 
    pokemons, 
    loading, 
    hasCount,
    hasNext,
    hasPrev
  } = usePokemons(currentPage, selectedTypes);

  const goToPage = (page: number) => {
    updateUrl(selectedTypes, page);
  };

  return (
    <section className="flex flex-col gap-4 px-10 bg-white text-black">
      <p className="text-center">Welcome to Pokemon world</p>

      <p>Total count: {hasCount}</p>
      <FilterGroup
        selectedTypes={selectedTypes}
        setSelectedTypes={handleTypesChange}
      />

      <Listing pokemons={pokemons} loading={loading} />

      <Pagination
        currentPage={currentPage}
        goToPage={goToPage}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />
    </section>
  );
}
