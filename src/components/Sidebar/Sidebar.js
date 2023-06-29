import { documentSvg, trashSvg, plusSvg } from '../../utils/svgTemplates.js';
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
      if (!role) return;

      const id = Number(e.target.closest('li')?.getAttribute('data-id'));
      if (isNaN(id)) return;

      if (role === 'navigate') this.onNavigate(id);
      else if (role === 'append') this.onAppend(id);
      else if (role === 'remove') this.onRemove(id);
    });
  }

  render() {
    const { $target, state } = this;

    const listTemplate = (list, depth) =>
      `<ul class="sidebar__document-list">${list.map((item) => listItemTemplate(item, depth)).join('')}</ul>`;

    const listItemTemplate = ({ id, title, documents, createdAt, updateAt }, depth) => `
      <li class="sidebar__document-item" data-id="${id}">
        <div class="sidebar__document" data-role="navigate" style="padding-left: ${0.5 + 1 * depth}em;">
          <div class="sidebar__document-svg">${documentSvg('document-svg')}</div>
          <div class="sidebar__document--title">${title}</div>
          <section class="sidebar__document--action-section">
            <div data-role="remove">${trashSvg('trash-svg')}</div>
            <div data-role="append">${plusSvg('plus-svg')}</div>
          </section>
        </div>
        ${documents.length > 0 ? listTemplate(documents, depth + 1) : ''}
      </li>
    `;

    $target.innerHTML = `${listTemplate(state, 0)}`;
  }
}
