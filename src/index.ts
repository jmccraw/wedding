import { initViewportHeight, setViewportHeightVariableName } from './utilities/ViewportHeight.js';
import initMain from './components/main/Main';
import initOpener from './components/opener/Opener';
import initStickyHeader from './components/sticky-header/StickyHeader';
import initWeek from './components/week/Week';

import initImageHelper from './components/image-helper/ImageHelper';

const App = () => {
  setViewportHeightVariableName( '--fpi-vh' );
  initViewportHeight();
  initMain();
  initOpener();
  initStickyHeader();
  initWeek();

  initImageHelper();
};

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

document.addEventListener( 'DOMContentLoaded', App, { passive: true } );
