export default function NotionEditor({ $target }) {
    const $sideBar = document.createElement('div');
    $sideBar.className = 'editor';

    $target.appendChild($sideBar);
}
