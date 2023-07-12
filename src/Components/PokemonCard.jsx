import { useState } from "react";
import PokemonModal from "./PokemonModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { PokemonCardPropTypes } from "../PropTypes/Validaciones";

import Danger from "../Media/Danger.png";

library.add(faInfoCircle);

const PokemonCard = ({ pokemon, spriteURL, pokedexNumber, error }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const extendedPokemon = {
    ...pokemon,
    image: spriteURL,
  };
  

  if (error) {
    return (
      <div className="mb-4 p-1">
        <h2 className="text-gray-600 text-xl">Esta combinación de tipos no existe.</h2>
      </div>
    );
  }

  return (
    <div key={pokemon.id} className="mb-4 p-1">
      <div className="border rounded border-solid border-gray-300  w-72 relative">
        <div className="pokedex-number absolute top-2 left-2 bg-yellow-400 text-black py-1 px-2 rounded text-sm font-bold shadow-xl">
          N° en la Pokédex: {pokedexNumber}
        </div>
        <img
          src={spriteURL ? spriteURL : Danger}
          className="card-img-top object-contain h-40 mx-auto"
          alt={pokemon.name}
        />
        <div className="flex flex-1 p-3 flex-col items-center">
          <h5 className="mb-2 capitalize">{pokemon.name}</h5>
          <section className="type-container w-full flex justify-evenly">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={`type-${type.toLowerCase()} text-white rounded-md p-1 px-4 capitalize`}
              >
                {type}
              </span>
            ))}
          </section>
          <button
            type="button"
            className="absolute top-0 right-0 mt-2 mr-2 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleOpenModal}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            aria-label="Información del Item"
          >
            <FontAwesomeIcon icon="info-circle" />
          </button>

          {isModalOpen && (
            <PokemonModal
              pokemon={extendedPokemon}
              handleCloseModal={() => setIsModalOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

PokemonCard.propTypes = PokemonCardPropTypes;

export default PokemonCard;
