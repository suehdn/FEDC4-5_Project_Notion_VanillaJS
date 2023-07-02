import App from './App';
import './styleReset.css';

const initApp = ($target) => new App({ $target });

const $app = document.querySelector(`#app`);

initApp($app);
