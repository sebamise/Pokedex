import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import FilterBar from "./FilterBar";
import "./Style.css";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import Loader from "./Loader";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedPokemon, setSearchedPokemon] = useState([]);
  const [searching, setSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(20);
  const [combinationExists, setCombinationExists] = useState(true);
  const [error, setError] = useState(false);
  const [cache, setCache] = useState({})

  useEffect(() => {
    const cachedData = localStorage.getItem("pokemonCache");
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      setPokemonList(parsedData.pokemonList);
      setFilteredList(parsedData.filteredList);
      setTotalCount(parsedData.totalCount);
      setCache(parsedData.cache);
    } else {
      getPokemonList();
    }
  }, []);

  useEffect(() => {
    if (filteredTypes.length > 0) {
      getFilteredList();
    } else {
      getPokemonList();
    }
  }, [filteredTypes, offset, limit]);

  useEffect(() => {
    const cachedData = JSON.stringify({
      pokemonList,
      filteredList,
      totalCount,
      cache
    });
    localStorage.setItem("pokemonCache", cachedData);
  }, [pokemonList, filteredList, totalCount, cache]);

  const getPokemonList = async () => {
    try {
      setIsLoading(true);

      const endpoint = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

      if (cache[endpoint]) {
        // Si los datos están en caché, obtén los datos de la caché
        const data = cache[endpoint];
        setTotalCount(data.count);

        const updatedPokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            if (cache[pokemon.url]) {
              // Si los datos del Pokémon están en caché, obtén los datos de la caché
              return cache[pokemon.url];
            } else {
              // Si los datos del Pokémon no están en caché, haz la llamada a la API
              const pokemonResponse = await fetch(pokemon.url);
              const pokemonData = await pokemonResponse.json();

              const types = pokemonData.types.map((type) => type.type.name);

              const updatedPokemon = {
                id: pokemonData.id,
                name: pokemonData.name,
                spriteURL: pokemonData.sprites.front_default,
                types,
              };

              // Actualiza la caché con los datos del Pokémon
              setCache((prevCache) => ({
                ...prevCache,
                [pokemon.url]: updatedPokemon,
              }));

              return updatedPokemon;
            }
          })
        );

        setPokemonList(updatedPokemonData);
      } else {
        // Si los datos no están en caché, haz la llamada a la API
        const response = await fetch(endpoint);
        const data = await response.json();

        setTotalCount(data.count);

        const updatedPokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();

            const types = pokemonData.types.map((type) => type.type.name);

            const updatedPokemon = {
              id: pokemonData.id,
              name: pokemonData.name,
              spriteURL: pokemonData.sprites.front_default,
              types,
            };

            // Actualiza la caché con los datos del Pokémon
            setCache((prevCache) => ({
              ...prevCache,
              [pokemon.url]: updatedPokemon,
            }));

            return updatedPokemon;
          })
        );

        // Actualiza la caché con los datos de la lista de Pokémon
        setCache((prevCache) => ({
          ...prevCache,
          [endpoint]: data,
        }));

        setPokemonList(updatedPokemonData);
        console.log(pokemonList)
      }
    } catch (error) {
      console.log("Error:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getFilteredList = async () => {
    try {
      setIsLoading(true);

      const updatedPokemonData = [];

      const typePromises = filteredTypes.map(async (type) => {
        const typeUrl = `https://pokeapi.co/api/v2/type/${type}`;
        const typeResponse = await fetch(typeUrl);
        const typeData = await typeResponse.json();

        return typeData.pokemon.map((pokemonEntry) => pokemonEntry.pokemon.url);
      });

      const typePokemonUrls = await Promise.all(typePromises);
      const commonPokemonUrls = typePokemonUrls.reduce((a, b) =>
        a.filter((url) => b.includes(url))
      );

      const pokemonPromises = commonPokemonUrls.map(async (url) => {
        if (cache[url]) {
          // Si los datos del Pokémon están en caché, obtén los datos de la caché
          return cache[url];
        } else {
          // Si los datos del Pokémon no están en caché, haz la llamada a la API
          const response = await fetch(url);
          const pokemonData = await response.json();

          const types = pokemonData.types.map((type) => type.type.name);

          const updatedPokemon = {
            id: pokemonData.id,
            name: pokemonData.name,
            spriteURL: pokemonData.sprites.front_default,
            types,
          };

          // Actualiza la caché con los datos del Pokémon
          setCache((prevCache) => ({
            ...prevCache,
            [url]: updatedPokemon,
          }));

          return updatedPokemon;
        }
      });

      const commonPokemonData = await Promise.all(pokemonPromises);

      for (const pokemon of commonPokemonData) {
        if (filteredTypes.every((type) => pokemon.types.includes(type))) {
          updatedPokemonData.push(pokemon);
        }
      }

      const combinationExists = updatedPokemonData.length > 0;
      setCombinationExists(combinationExists);

      setTotalCount(updatedPokemonData.length);
      setFilteredList(updatedPokemonData);
      setError(!combinationExists);
    } catch (error) {
      console.log("Error:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searching) {
      handleSearchButtonClick();
    }
  }, [searching]);
  
  const handleSearchButtonClick = async () => {
    try {
      setIsLoading(true);
  
      const endpoint = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;
  
      const response = await fetch(endpoint);
      const data = await response.json();
  
      if (data.types && data.types.length > 0) {
        const types = data.types.map((type) => type.type.name);
  
        const searchPokemon = {
          id: data.id,
          name: data.name,
          spriteURL: data.sprites.front_default,
          types,
        };
  
        setSearchedPokemon([searchPokemon]);
        setTotalCount(1);
        setCurrentPage(1);
        setError(false);
      } else {
        setSearchedPokemon([]);
        setTotalCount(0);
        setError(true);
      }
    } catch (error) {
      console.log("Error:", error);
      setSearchedPokemon([]);
      setTotalCount(0);
      setError(true);
    } finally {
      setIsLoading(false);
      setSearching(false); // Se completa la búsqueda
    }
  };
  
  const getSearchPokemon = () => {
    setSearchTerm(search);
    setSearching(true); // Indicar que se está realizando una búsqueda
  };
  

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  

  const handleFilter = (types) => {
    setFilteredTypes(types);
    setOffset(0);
  };
  

  const displayedPokemon = filteredTypes.length > 0 ? filteredList : pokemonList;

  const filteredPokemon = displayedPokemon
  .concat(searchedPokemon)
  .filter((pokemon, index, array) => {
    const foundIndex = array.findIndex((p) => p.id === pokemon.id);
    return foundIndex === index;
  })
  .filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


const startIndex = (currentPage - 1) * limit;
const endIndex = startIndex + limit;
const paginatedPokemon = filteredPokemon.slice(startIndex, endIndex);

const handleReset = () => {
  setFilteredTypes([]);
  setSearchTerm("");
  setSearch("");
  setOffset(0);
  setSearchedPokemon([]);
  setSearching(false); // Añadir esta línea para indicar que no se está realizando ninguna búsqueda
  setCurrentPage(1); // Restablecer la página actual a 1
};

  

  return (
    <>
      <section className="flex mt-5 p-2">
        <FilterBar handleFilter={handleFilter} />
        <SearchBar handleReset={handleReset} searchTerm={searchTerm} handleSearch={handleSearch} getSearchPokemon={getSearchPokemon} search={search}/>
      </section>

      {combinationExists ? (
        <div className="flex flex-wrap justify-center p-4">
          {isLoading ? (
            <Loader />
          ) : (
            paginatedPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                spriteURL={pokemon.spriteURL}
                pokedexNumber={pokemon.id}
              />
            ))
          )}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center p-4">
          <PokemonCard error={error} />
        </div>
      )}

      <Pagination
        offset={offset}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setOffset={setOffset}
        filteredTypes={filteredTypes}
      />
    </>
  );
};

export default PokemonList;