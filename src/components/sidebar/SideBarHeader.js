export default function SideBarHeader({ $target, initialState }) {
    this.state = initialState;

    $target.innerHTML = `<div class="sidebar-header">${this.state.name}</div>`;

    this.render = () => {};
}
