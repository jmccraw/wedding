import initMain from './components/main/Main';
import initOpener from './components/opener/Opener';
import initStickyHeader from './components/sticky-header/StickyHeader';

const App = () => {
  initMain();
  initOpener();
  initStickyHeader();
};

App();
