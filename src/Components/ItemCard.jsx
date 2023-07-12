import { useState } from "react";
import ItemModal from "./ItemModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Danger from "../Media/Danger.png";
import { ItemCardPropTypes } from "../PropTypes/Validaciones";

library.add(faInfoCircle);

const ItemCard = ({ item, cost }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div key={item.id} className="mb-4 p-1">
      <div className="border rounded border-solid border-gray-300  w-72 relative">
        <div className="pokedex-number absolute top-2 left-2 bg-blue-400 text-black py-1 px-2 rounded text-sm font-bold shadow">
          Costo en la tienda: {cost}
        </div>
        <img
          src={item.spriteURL ? item.spriteURL : Danger}
          className="card-img-top object-contain h-40 mx-auto"
          alt={item.name}
        />
        <div className="flex flex-1 p-3 flex-col items-center">
          <h5 className="mb-2 capitalize">{item.name}</h5>
          <div className="categories-container w-full flex justify-evenly">
            {item.category && (
              <span
                key={item.category}
                className={`category-${item.category.toLowerCase()} text-white rounded p-1 px-3 text-capitalize`}
              >
                {item.category}
              </span>
            )}
          </div>

          <button
            type="button"
            className="absolute top-0 right-0 mt-2 mr-2 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleOpenModal}
            aria-label="Información del Item"
          >
            <FontAwesomeIcon icon="info-circle" />
          </button>

          {isModalOpen && (
            <ItemModal item={item} handleCloseModal={handleCloseModal} />
          )}
        </div>
      </div>
    </div>
  );
};

ItemCard.propTypes = ItemCardPropTypes;

export default ItemCard;
