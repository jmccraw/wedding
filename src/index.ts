import initMain from './components/main/Main';
import initOpener from './components/opener/Opener';
import initStickyHeader from './components/sticky-header/StickyHeader';
import initWeek from './components/week/Week';

const App = () => {
  initMain();
  initOpener();
  initStickyHeader();
  initWeek();
};

App();
