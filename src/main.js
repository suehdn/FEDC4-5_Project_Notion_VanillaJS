import App from './App';

const initApp = ($target) => new App({ $target });

const $app = document.querySelector(`#app`);

initApp($app);
