import { initViewportHeight, setViewportHeightVariableName } from './utilities/ViewportHeight.js';
import initMain from './components/main/Main';
import initNav from './components/nav/Nav';
import initOpener from './components/opener/Opener';
import initPolaroids from './components/polaroids/Polaroids';
import initImageHelper from './components/image-helper/ImageHelper';

declare global {
  interface Window {
    espn: any;
    gsap: any;
    ScrollToPlugin: any;
    ScrollTrigger: any;
  }
}

const App = () => {
  // TODO FIXME
  setViewportHeightVariableName( '--fpi-vh' );
  initViewportHeight();
  initMain();
  initNav();
  initOpener();
  initPolaroids();
  initImageHelper();
};

document.addEventListener( 'DOMContentLoaded', App, { passive: true } );
