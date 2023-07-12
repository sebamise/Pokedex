import { useState } from "react";
import { FilterBarItemPropTypes } from "../PropTypes/Validaciones";

const FilterBarItem = ({ handleFilter }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isResetEnabled, setIsResetEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const categories = [
    "stat-boosts",
    "effort-drop",
    "medicine",
    "other",
    "in-a-pinch",
    "picky-healing",
    "type-protection",
    "baking-only",
    "collectibles",
    "evolution",
    "spelunking",
    "held-items",
    "choice",
    "effort-training",
    "bad-held-items",
    "training",
    "plates",
    "species-specific",
    "type-enhancement",
    "event-items",
    "gameplay",
    "plot-advancement",
    "unused",
    "loot",
    "all-mail",
    "vitamins",
    "healing",
    "pp-recovery",
    "revival",
    "status-cures",
    "mulch",
    "special-balls",
    "standard-balls",
    "dex-completion",
    "scarves",
    "all-machines",
    "flutes",
    "apricorn-balls",
    "apricorn-box",
    "data-cards",
    "jewels",
    "miracle-shooter",
    "mega-stones",
    "memories",
    "z-crystals",
    "species-candies",
    "catching-bonus",
    "dynamax-crystals",
    "nature-mints",
    "curry-ingredients",
    "tera-shard",
    "sandwich-ingredients",
    "tm-materials",
    "picnic",
    /* Agrega más categorías de items según sea necesario */
  ];

  const handleCheckboxChange = (event) => {
    const category = event.target.value;
    if (event.target.checked) {
      if (selectedCategories.length < 1) {
        setSelectedCategories([...selectedCategories, category]);
      } else {
        setErrorMessage("Máximo 1 filtros seleccionables");
      }
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
      setErrorMessage("");
    }
    setIsResetEnabled(false);
  };

  const handleApplyFilters = () => {
    if (selectedCategories.length > 0) {
      const lowercaseCategories = selectedCategories.map((category) =>category.toLowerCase());
      handleFilter(lowercaseCategories);
      setIsResetEnabled(true);
    } else {
      handleFilter([]);
    }
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setIsFilterOpen(false);
    handleFilter([]);
  };

  const checkboxes = categories.map((category) => (
    <div key={category} className="mb-3 flex items-center">
      <input
        className="form-checkbox"
        type="checkbox"
        value={category}
        checked={selectedCategories.includes(category)}
        onChange={handleCheckboxChange}
        style={{ width: "20px", height: "20px" }}
      />
      <label className="ml-2">{category}</label>
    </div>
  ));

  const isFilterDisabled = selectedCategories.length === 0; // Comprueba si no se ha seleccionado ninguna categoría

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

      {isFilterOpen && (
        <div className="fixed inset-0 overflow-hidden" style={{ zIndex: "99" }}>
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
      )}
    </>
  );
};

FilterBarItem.propTypes = FilterBarItemPropTypes;

export default FilterBarItem;
