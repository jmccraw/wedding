import { initViewportHeight, setViewportHeightVariableName } from './utilities/ViewportHeight.js';
import initMain from './components/main/Main';
import initOpener from './components/opener/Opener';
import initStickyHeader from './components/sticky-header/StickyHeader';
import initWeek from './components/week/Week';
import initRelatedStories from './components/related-stories/RelatedStories';
import initImageHelper from './components/image-helper/ImageHelper';

const App = () => {
  setViewportHeightVariableName( '--fpi-vh' );
  initViewportHeight();
  initMain();
  initOpener();
  initStickyHeader();
  initWeek();
  initRelatedStories();
  initImageHelper();

  // Refresh the ScrollTrigger so it adjusts start/end positions properly
  window.setTimeout( () => {
    window.ScrollTrigger.refresh();
  }, 1000 );
};

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

document.addEventListener( 'DOMContentLoaded', App, { passive: true } );
