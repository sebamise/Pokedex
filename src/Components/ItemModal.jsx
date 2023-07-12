import React, { useEffect, useRef, useState } from "react";
import Danger from "../Media/Danger.png";
import "./Style.css";
import Loader from "./Loader";
import { ItemModalPropTypes } from "../PropTypes/Validaciones";

const ItemModal = ({ item, handleCloseModal }) => {
  const [cost, setCost] = React.useState(null);
  const { name, spriteURL, category } = item;
  const [attributes, setAttributes] = useState([]);
  const [effectEntries, setEffectEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/item/${item.id}`
        );
        const itemData = await response.json();
        setCost(itemData.cost);
        setAttributes(itemData.attributes);
        setEffectEntries(itemData.effect_entries);
        setIsLoading(false);
      } catch (error) {
        console.log("Error:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [item.id]);

  const atributosTraducidos = {
    countable: "Contable",
    consumable: "Consumible",
    "usable-in-battle": "Utilizable en batalla",
    holdable: "Sostenible",
    "usable-overworld": "Usable fuera de combate",
    // Agrega las traducciones de los atributos aquí
  };

  const [isAttributesOpen, setIsAttributesOpen] = React.useState(false);
  const [isEffectsOpen, setIsEffectsOpen] = React.useState(false);
  const modalRef = useRef(null);

  const toggleAttributesAccordion = () => {
    setIsAttributesOpen(!isAttributesOpen);
  };

  const toggleEffectsAccordion = () => {
    setIsEffectsOpen(!isEffectsOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleCloseModal]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black">
      <div
        className="bg-white rounded-lg max-w-md w-full mx-4 z-10 max-h-screen overflow-y-auto"
        ref={modalRef}
      >
        <div className="p-3">
          <div className="flex items-center justify-between">
          {isLoading ? (
              <h3>Cargando...</h3>
            ) : (
              <div className="pokedex-number bg-blue-400 text-black py-1 px-2 rounded text-sm font-bold shadow">
                Costo en la Tienda:  {cost}
              </div>
            )}
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
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
          </div>
          <div className="p-3">
            <img
              src={spriteURL ? spriteURL : Danger}
              alt={name}
              className="w-full h-40 object-contain mx-auto mb-3 rounded-lg"
            />

            <div>
              <div className="flex flex-col">
                <section>
                  <h2 className="text-2xl capitalize text-gray-600 font-semibold text-center mb-3">
                    {name}
                  </h2>
                </section>
                <section className="m-auto">
                  <h2
                    className={`category-${item.category.toLowerCase()} text-white rounded p-1 px-3 w-100 capitalize text-center`}
                  >
                    {category}
                  </h2>
                </section>
              </div>
              {attributes.length > 0 && (
                <div className="mt-5">
                  <div className="bg-gray-200 rounded-lg overflow-hidden ">
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer "
                      onClick={toggleAttributesAccordion}
                    >
                      <h2 className="text-center text-2xl font-bold">
                        Atributos
                      </h2>
                      <svg
                        className={`w-6 h-6 transition-transform ${
                          isAttributesOpen ? "transform rotate-180" : ""
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
                    {isAttributesOpen && (
                      <div className="p-3">
                        {attributes.map((attribute, index) => (
                          <div
                            key={index}
                            className="font-bold bg-white p-2 rounded-lg shadow-md mb-3 "
                          >
                            {atributosTraducidos[attribute.name]}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {isLoading ? (
                <Loader />
              ) : (
                effectEntries.length > 0 && (
                  <div className="mt-5">
                    <div className="bg-blue-500 rounded-t-lg">
                      <div
                        className="flex items-center justify-between p-4 cursor-pointer"
                        onClick={toggleEffectsAccordion}
                      >
                        <h2 className="text-2xl font-bold text-white">
                          Efectos
                        </h2>
                        <svg
                          className={`w-6 h-6 transition-transform ${
                            isEffectsOpen ? "transform rotate-180" : ""
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
                    </div>
                    {isEffectsOpen && (
                      <div className="bg-blue-200 p-4 rounded-b-lg">
                        <ul>
                          {effectEntries.map((entry, index) => (
                            <li key={index}>{entry.effect}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex justify-end p-4">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-600 focus:outline-none"
              onClick={handleCloseModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
};

// Validación de props para el componente ItemModal

ItemModal.propTypes = ItemModalPropTypes;

export default ItemModal;