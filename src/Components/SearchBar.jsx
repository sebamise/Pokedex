import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSync } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ handleSearch, getSearchPokemon, search, getSearchItem, handleReset }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInvalidSearch, setIsInvalidSearch] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const currentUrl = window.location.pathname;
      if (currentUrl === "/PokemonList" && search !== "") {
        setIsInvalidSearch(false);
        getSearchPokemon();
      } else if (currentUrl === "/ItemsList" && search !== "") {
        setIsInvalidSearch(false);
        getSearchItem();
      } else {
        setIsInvalidSearch(true);
      }
    }
  };

  const resetAll = () => {
    setIsExpanded(false);
    setIsInvalidSearch(false);
    handleReset();
  };

  return (
    <div className="mb-4 p-1 max-w-40 ml-auto relative">
      <div className="ml-auto relative">
        <input
          type="text"
          placeholder="Buscar"
          className={`pl-8 pr-3 transition-all duration-500 ${
            isExpanded ? "w-40" : "w-8"
          }`}
          style={{ opacity: isExpanded ? "1" : "0" }}
          value={search}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />

        <span
          className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
        </span>
        <span
          style={{ marginRight: "-2rem" }}
          className={`absolute inset-y-0 right-12 flex items-center pl-3 cursor-pointer ${
            isExpanded ? "opacity-100" : "hidden"
          }`}
        >
          <FontAwesomeIcon icon={faSync} className="text-gray-400" onClick={resetAll} />
        </span>
      </div>
      {isExpanded && (
        <section
          className={`text-center transition-all duration-500 ${
            isExpanded ? "opacity-100" : "opacity-0"
          }`}
        >
          {isInvalidSearch && <p style={{ color: "red" }}>La búsqueda no es válida</p>}
        </section>
      )}
    </div>
  );
};

export default SearchBar;
