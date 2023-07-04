import { push } from '../utils/router.js';

export default function DocumentList({ $target, initialState }) {
  const $documentList = document.createElement('div');
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $documentList.innerHTML = `
      <ul>
        ${this.state
          .map(
            ({ id, title }) => `
            <li data-id=${id}>${title}</li>  
          `
          )
          .join('')}
      </ul>
    `;
  };

  this.render();

  $documentList.addEventListener('click', (e) => {
    const $li = e.target.closest('li');

    if ($li) {
      const { id } = $li.dataset;

      push(`/documents/${id}`);
    }
  });
}
