import { history } from '@utils/router';

import './NotionSidebar.css';

export default class NotionSidebar {
  constructor({ $target }) {
    const $sidebarContainer = document.createElement('nav');
    $sidebarContainer.className = 'notion-sidebar-container';
    $target.appendChild($sidebarContainer);

    this.$sidebar = document.createElement('ul');
    $sidebarContainer.appendChild(this.$sidebar);

    this.setEvent();
  }

  setEvent() {
    this.$sidebar.addEventListener('click', (e) => {
      const $li = e.target.closest('li');

      if ($li) {
        const { id } = $li.dataset;
        history.push(`/documents/${id}`);
      }
    });
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
