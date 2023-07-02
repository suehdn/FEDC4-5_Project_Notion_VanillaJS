export default function SideBarBody({ $target }) {
    const body = document.createElement('div');
    body.style = `padding-top: 6px; padding-bottom: 20px; z-index: 1; overflow: hidden auto; margin-right: 0px; margin-bottom: 0px;`;
    $target.appendChild(body);
}
