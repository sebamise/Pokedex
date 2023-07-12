import { useState } from 'react';
import { Link } from 'react-router-dom';
import Images from '../Media/Images';
const { Logo, LogoWebp, webpSupported } = Images;

const LogoPokedex = [ webpSupported ? LogoWebp : Logo];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img src={LogoPokedex} alt="Logo Pokemon" className="max-h-10 max-w-40" />
          </Link>
          <div className="hidden md:flex">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Inicio
              </Link>
              <Link to="/PokemonList" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Pokemones
              </Link>
              <Link to="/ItemsList" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Items
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
              onClick={toggleMenu}
              aria-label='Menu de Navegación'
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16Z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16ZM4 9H20V7H4V9Z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
              >
                Inicio
              </Link>
              <Link
                to="/PokemonList"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
              >
                Pokemones
              </Link>
              <Link
                to="/ItemsList"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
              >
                Items
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;