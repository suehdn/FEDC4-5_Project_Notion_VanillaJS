import NotionSideBar from './components/NotionSideBar.js';
import NotionEditor from './components/NotionEditor.js';
import { getItem } from './utils/storage.js';

export default function App({ $target }) {
    const $mainContainer = document.createElement('div');
    $mainContainer.className = 'main-container';
    $target.appendChild($mainContainer);

    this.state = getItem('notion', []);

    new NotionSideBar({ $target: $mainContainer, initialState: this.state });
    new NotionEditor({ $target: $mainContainer, initialState: this.state });
}
