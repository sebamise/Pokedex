import Slider1 from './Slider1.jpg';
import Slider2 from './Slider2.jpg';
import Slider3 from './Slider3.jpg';
import Slider1Webp from './Slider1.webp'
import Slider2Webp from './Slider2.webp'
import Slider3Webp from './Slider3.webp'
import Logo from "../Media/Pokédex_logo.png";
import LogoWebp from "../Media/Pokédex_logo.webp";
const webpSupported = document.createElement('canvas').toDataURL('image/webp').startsWith('data:image/webp');

export default {
  Slider1,
  Slider2,
  Slider3,
  Slider1Webp,
  Slider2Webp,
  Slider3Webp,
  Logo,
  LogoWebp,
  webpSupported
};
