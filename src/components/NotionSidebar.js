import './NotionSidebar.css';

export default class NotionSidebar {
  constructor({ $target }) {
    const $sidebarContainer = document.createElement('nav');
    $sidebarContainer.className = 'notion-sidebar-container';
    $target.appendChild($sidebarContainer);

    this.$sidebar = document.createElement('ul');
    $sidebarContainer.appendChild(this.$sidebar);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$sidebar.innerHTML = this.state
      .map(
        (document) => `
        <li data-id="${document.id}">${document.title}</li>
      `
      )
      .join('');
  }
}
