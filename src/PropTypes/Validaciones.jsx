import PropTypes from 'prop-types';

export const PokemonCardPropTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  spriteURL: PropTypes.string.isRequired,
  pokedexNumber: PropTypes.number.isRequired,
};

export const PokemonModalPropTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};

export const PaginationPropTypes = {
  offset: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  setOffset: PropTypes.func.isRequired,
  setShowAllPokemon: PropTypes.func,
  filteredTypes: PropTypes.array,
};

export const ItemModalPropTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sprites: PropTypes.string,
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
  }).isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};

export const ItemCardPropTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    spriteURL: PropTypes.string,
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
  }).isRequired,
};

export const FilterBarItemPropTypes = {
  handleFilter: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
};

export const FilterBarPropTypes = {
  handleFilter: PropTypes.func.isRequired,
};
