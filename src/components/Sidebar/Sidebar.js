import template from './templates.js';
import { plusSvg } from '../../utils/svgTemplates.js';
import './Sidebar.css';

export default class Sidebar {
  constructor({ $target, initialState, onNavigate, onAppend, onRemove }) {
    this.$target = $target;
    this.state = initialState;
    this.onNavigate = onNavigate;
    this.onAppend = onAppend;
    this.onRemove = onRemove;

    this.render();
    this.initEvents();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  initEvents() {
    this.$target.addEventListener('click', (e) => {
      const role = e.target.closest('[data-role]')?.dataset.role;
      const id = Number(e.target.closest('li')?.getAttribute('data-id'));
      if (!role) return;

      if (role === 'create') this.onAppend(null);
      else if (role === 'navigate' && !isNaN(id)) this.onNavigate(id);
      else if (role === 'append' && !isNaN(id)) this.onAppend(id);
      else if (role === 'remove' && !isNaN(id)) this.onRemove(id);
    });
  }

  render() {
    const { $target, state } = this;

    $target.innerHTML = `
      <header class="sidebar__header">Hoon's Notion</header>
      <nav class="sidebar__nav">${template.documentList(state, 0)}</nav>
      <footer class="sidebar__footer" data-role="create">
        ${plusSvg()}
        <span>페이지 추가</span>
      </footer>
    `;
  }
}
