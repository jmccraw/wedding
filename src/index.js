import init from './components/Opener.js';
import Opener from './components/Opener.hbs';

const openerData = {
  openerTitle: 'Your content here!',
  buttonCTA: 'Change Color'
};

const App = () => {
  const _opener = document.querySelector( '.opener' );
  _opener.innerHTML = Opener( openerData );
  init();
};

App();
