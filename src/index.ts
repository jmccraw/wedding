import { initViewportHeight, setViewportHeightVariableName } from './utilities/ViewportHeight.js';
import initMain from './components/main/Main';
import initOpener from './components/opener/Opener';
import initStickyHeader from './components/sticky-header/StickyHeader';
import initWeek from './components/week/Week';
import initRelatedStories from './components/related-stories/RelatedStories';
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
  setViewportHeightVariableName( '--fpi-vh' );
  initViewportHeight();
  initMain();
  initOpener();
  initStickyHeader();
  initWeek();
  initRelatedStories();
  initImageHelper();
};

document.addEventListener( 'DOMContentLoaded', App, { passive: true } );
