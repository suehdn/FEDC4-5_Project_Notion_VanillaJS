import './App.css';

export default class App {
  constructor({ $target }) {
    const $title = document.createElement('h1');
    $title.textContent = 'Notion with Vanilla JS';
    $target.appendChild($title);
  }
}
