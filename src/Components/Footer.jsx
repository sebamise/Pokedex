import { Link } from "react-router-dom";
import Images from "../Media/Images";
const { Logo, LogoWebp, webpSupported } = Images;

const LogoPokedex = [webpSupported ? LogoWebp : Logo];

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer class="bg-white dark:bg-gray-900">
      <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0 mr-5 pr-5">
            <Link to="/">
              <img src={LogoPokedex} className="mx-1" alt="FlowBite Logo" />
            </Link>
          </div>
          <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div className="text-center">
              <h2 class="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Pokemon
              </h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-4">
                  <p>
                    En este sitio web podras encontrar informacion sobre tus
                    pokemones favoritos.
                  </p>
                </li>
              </ul>
            </div>
            <div className="m-auto">
              <h2 class="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Enlaces
              </h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-2">
                  <Link to="/PokemonList" class="hover:underline ">
                    Pokemones
                  </Link>
                </li>
                <li>
                  <Link to="/ItemList" class="hover:underline">
                    Items
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-2">
                  <Link to="#" class="hover:underline">
                    Politica de Privacidad
                  </Link>
                </li>
                <li>
                  <Link to="#" class="hover:underline">
                    Terminos &amp; Condiciones
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <Link to="https://flowbite.com/" class="hover:underline">
              Visita mi Pagina Personal
            </Link>
          </span>
          <div class="flex mt-4 space-x-5 sm:justify-center text-white sm:mt-0">
            <Link>
              <FontAwesomeIcon icon={faFacebookF} />
            </Link>
            <Link>
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link>
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
            <Link>
              <FontAwesomeIcon icon={faYoutube} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
