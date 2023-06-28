export default class Sidebar {
  constructor({ $target, initialState, onAppend, onRemove }) {
    this.$target = $target;
    this.state = initialState;
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
      const role = e.target.dataset.role;
      if (!role) return;

      const id = Number(e.target.closest('li')?.getAttribute('data-id'));
      if (isNaN(id)) return;

      if (role === 'append') this.onAppend(id);
      else if (role === 'remove') this.onRemove(id);
    });
  }

  render() {
    const { $target, state } = this;

    const listTemplate = (list) => `<ul>${list.map(listItemTemplate).join('')}</ul>`;

    const listItemTemplate = ({ id, title, documents, createdAt, updateAt }) => `
      <li data-id="${id}">
        <div>
          <span>${title}</span>
          <button data-role="remove" type="button">X</button>
          <button data-role="append" type="button">+</button>
        </div>
        ${documents.length > 0 ? listTemplate(documents) : ''}
      </li>
    `;

    $target.innerHTML = `${listTemplate(state)}`;
  }
}
