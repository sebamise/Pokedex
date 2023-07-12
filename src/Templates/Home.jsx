import React, { useEffect, useState } from "react";
import Slider from "../Components/Slider";
import Loader from "../Components/Loader";
import Footer from "../Components/Footer";
import "../Components/Style.css";

export default function Home() {
  const [showYouTube, setShowYouTube] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowYouTube(true);
    }, 2000); // Establece un tiempo de espera de 1.5 segundos antes de mostrar el iframe

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Slider />
      <section className="text-center m-auto main pt-5" style={{width: "75%"}}>
        <h2 className="text-xl bg-black p-2 text-white">Pokémon</h2>
        <figure className="mt-3">
  <blockquote className="blockquote">
    <p className="text-xl">
      Los Pokémon son criaturas inspiradas en animales reales, insectos, objetos, plantas o seres mitológicos. Los jugadores toman el papel de Entrenadores Pokémon y tienen tres objetivos: completar la Pokédex mediante la recopilación de todas las especies de Pokémon disponibles, entrenar un equipo de Pokémon poderosos que hayan atrapado para competir contra otros entrenadores. El objetivo final del juego es llegar a ganar la Liga Pokémon y convertirse en el campeón regional.
    </p>
  </blockquote>
  <figcaption className="text-gray-500 text-sm mb-3">-Wikipedia</figcaption>
</figure>

      </section>
      <section className="text-center m-auto main" style={{width: "75%"}}>
        <h2 className="bg-black text-white mb-5">Opening</h2>
        <section className="video-container mb-5">
          {!showYouTube ? (
            <Loader />
          ) : (
            <iframe
              width="853"
              height="480"
              src="https://www.youtube-nocookie.com/embed/uDIoEbbFKAY"
              title="Opening Pokémon Temporada 1 Latino"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )}
        </section>
      </section>
      <Footer />
    </div>
  );
}
