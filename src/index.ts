import initMain from './components/main/Main';
import initOpener from './components/opener/Opener';
import initStickyHeader from './components/sticky-header/StickyHeader';
import initWeek from './components/week/Week';

import initImageHelper from './components/image-helper/ImageHelper';

const App = () => {
  initMain();
  initOpener();
  initStickyHeader();
  initWeek();

  initImageHelper();
};

App();
