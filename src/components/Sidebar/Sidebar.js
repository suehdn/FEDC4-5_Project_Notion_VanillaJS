import template from './templates.js';
import { plusSvg } from '../../utils/svgTemplates.js';
import html from './Sidebar.html';
import './Sidebar.css';

export default class Sidebar {
  constructor({ $target, initialState, onNavigate, onAppend, onRemove }) {
    this.$target = $target;
    $target.innerHTML = html;
    this.$nav = $target.querySelector('.sidebar__nav');

    this.state = initialState;
    this.onNavigate = onNavigate;
    this.onAppend = onAppend;
    this.onRemove = onRemove;

    $target.querySelector('.sidebar__footer').innerHTML = `
      ${plusSvg()}
      <span>페이지 추가</span>
    `;

    this.render();
    this.initEvents();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  initEvents() {
    const { $target } = this;
    
    $target.addEventListener('click', (e) => {
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
    const { $nav } = this;
    const { currentDocumentId, documents } = this.state;

    $nav.innerHTML = `${template.documentList({ documents, depth: 0, currentDocumentId })}`;
  }
}
