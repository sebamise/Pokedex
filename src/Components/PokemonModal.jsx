import { useState, useEffect } from "react";
import Danger from "../Media/Danger.png";
import { PokemonModalPropTypes } from "../PropTypes/Validaciones";

const PokemonModal = ({ pokemon, handleCloseModal }) => {
  const { id, name, image, types } = pokemon;
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [pokedexNumber, setPokedexNumber] = useState('');

  useEffect(() => {
    getPokemonStats();
  }, [id]);

  const getPokemonStats = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      const pokemonStats = data.stats.map((stat) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      }));

      const pokemonSpeciesResponse = await fetch(data.species.url);
      const pokemonSpeciesData = await pokemonSpeciesResponse.json();
      const pokedexNumber = pokemonSpeciesData.pokedex_numbers.find(
        (entry) => entry.pokedex.name === "national"
      ).entry_number;

      setStats(pokemonStats);
      setPokedexNumber(pokedexNumber);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const statNames = {
    "special-defense": "MDF",
    attack: "ATK",
    defense: "DEF",
    speed: "SPD",
    hp: "HP",
    "special-attack": "MTK",
    // Agrega otras abreviaciones aquí
  };

  const toggleStatsAccordion = () => {
    setIsStatsOpen(!isStatsOpen);
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  const handleBackgroundClick = () => {
    handleCloseModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleBackgroundClick}
      ></div>
      <div
        className="bg-white rounded-lg max-w-md w-full mx-4 z-10 overflow-y-auto"
        onClick={handleModalClick}
      >
        <div className="overflow-y-auto max-h-screen">
          <div className="p-4 relative">
            <button
              type="button"
              className="absolute top-0 z-50 right-0 m-4 text-gray-400 hover:text-gray-500"
              aria-label="Close"
              onClick={handleCloseModal}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <div className="relative">
              <div className="absolute top-0 left-0 bg-white text-gray-500 rounded-md ">
                <section className="pokedex-number bg-yellow-400 text-black py-1 px-2 rounded font-semibold text-sm shadow-xl">
                  N° en la Pokédex: {pokedexNumber}
                </section>
              </div>
              <img
                src={image ? image : Danger}
                alt={name}
                className="w-full h-40 object-contain mx-auto rounded-lg"
              />
              <h2 className="text-2xl capitalize text-gray-600 font-bold text-center mb-3">
                {name}
              </h2>
            </div>
            <section className="type-container w-full flex justify-evenly">
              {types.map((type) => (
                <span
                  key={type}
                  className={`type-${type.toLowerCase()} text-white rounded-md p-1 px-4 capitalize`}
                >
                  {type}
                </span>
              ))}
            </section>
            <div className="mt-4">
              <div className="bg-gray-200 rounded-lg overflow-hidden">
                <div
                  className="flex items-center justify-between p-6 cursor-pointer"
                  onClick={toggleStatsAccordion}
                >
                  <h2 className="text-center text-2xl font-bold text-gray-900">Stats</h2>
                  <svg
                    className={`w-6 h-6 transition-transform ${
                      isStatsOpen ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
                {isStatsOpen && (
                  <div className="p-3">
                    {isLoading ? (
                      <div>Loading stats...</div>
                    ) : (
                      stats.map((stat) => (
                        <div
                          key={stat.name}
                          className="font-bold bg-white p-2 rounded-lg shadow-md mb-3"
                        >
                          {statNames[stat.name] || stat.name}: {stat.value}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PokemonModal.propTypes = PokemonModalPropTypes;

export default PokemonModal;