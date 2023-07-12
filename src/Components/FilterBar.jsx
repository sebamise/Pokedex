import { useState } from "react";
import { FilterBarPropTypes } from "../PropTypes/Validaciones";

const FilterBar = ({ handleFilter }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isResetEnabled, setIsResetEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const types = [
    "Fire",
    "Grass",
    "Rock",
    "Poison",
    "Dark",
    "Flying",
    "Psychic",
    "Steel",
    "Fighting",
    "Normal",
    "Water",
    "Ghost",
    "Bug",
    "Ice",
    "Ground",
    "Dragon",
    "Electric",
    "Fairy",
    /* Agrega más opciones de tipo o elemento según sea necesario */
  ];

  const handleCheckboxChange = (event) => {
    const type = event.target.value.toLowerCase();
    if (event.target.checked) {
      if (selectedTypes.length < 2) {
        setSelectedTypes([...selectedTypes, type]);
      } else {
        setErrorMessage("Máximo 2 filtros seleccionables");
      }
    } else {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
      setErrorMessage("");
    }
    setIsResetEnabled(false);
  };

  const handleApplyFilters = () => {
    if (selectedTypes.length > 0) {
      const lowercaseTypes = selectedTypes.map((type) => type.toLowerCase());
      handleFilter(lowercaseTypes);
      setIsResetEnabled(true);
    } else {
      handleFilter([]);
    }
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setSelectedTypes([]);
    handleFilter([]);
    setIsResetEnabled(false);
    setErrorMessage("");
  };

  const checkboxes = types.map((type) => (
    <div key={type} className="mb-3 flex items-center">
      <input
        className="form-checkbox"
        type="checkbox"
        value={type}
        checked={selectedTypes.includes(type.toLowerCase())}
        onChange={handleCheckboxChange}
        style={{ width: "20px", height: "20px" }}
      />
      <label className="ml-2">{type}</label>
    </div>
  ));

  const isFilterDisabled = selectedTypes.length === 0; // Comprueba si no se ha seleccionado ningún filtro

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        style={{ height: "max-content" }}
        type="button"
        onClick={() => setIsFilterOpen(true)}
      >
        Filtrar
      </button>

      <div
        className={`fixed inset-0 overflow-hidden ${
          isFilterOpen ? "block" : "hidden"
        }`}
        style={{ zIndex: "99" }}
        aria-labelledby="offcanvasFilterLabel"
      >
        <div className="fixed inset-0" onClick={() => setIsFilterOpen(false)}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="relative flex flex-col w-full max-w-sm mx-auto my-10 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-200">
            <h5 className="text-lg font-semibold" id="offcanvasFilterLabel">
              Filtros
            </h5>
            <button
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={() => setIsFilterOpen(false)}
            >
              Cerrar
            </button>
          </div>
          <div className="overflow-y-auto p-4 max-h-80">
        <div className="grid grid-cols-2 gap-4">{checkboxes}</div>
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
      </div>
          <section className="flex justify-center p-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
              onClick={handleApplyFilters}
            >
              Aplicar
            </button>
            <button
              className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ${
                isFilterDisabled || !isResetEnabled
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={resetFilters}
              disabled={isFilterDisabled || !isResetEnabled}
            >
              Reiniciar
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

FilterBar.propTypes = FilterBarPropTypes;

export default FilterBar;
