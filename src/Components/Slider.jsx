import { useState, useEffect } from 'react';
import Images from '../Media/Images';

const { Slider1, Slider2, Slider3, Slider1Webp, Slider2Webp, Slider3Webp, webpSupported} = Images;

const imageArray = [
  webpSupported ? Slider1Webp : Slider1,
  webpSupported ? Slider2Webp : Slider2,
  webpSupported ? Slider3Webp : Slider3
];

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex === imageArray.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div className="flex">
        {imageArray.map((image, index) => (
          <div
            key={index}
            className={`slideIn w-full ${activeIndex === index ? 'block' : 'hidden'}`}
          >
            <img src={image} alt={`Slider Image ${index + 1}`} className="w-full h-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
