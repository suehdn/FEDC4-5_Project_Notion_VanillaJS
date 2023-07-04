import { push } from '../../domain/router';

export default function SidebarDocumentTree({ $target, initialState, addDocument, deleteDocument }) {
  const $sidebarDocumentTree = document.createElement('div');
  $sidebarDocumentTree.classList.add('sidebar-document__tree');
  $target.appendChild($sidebarDocumentTree);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const drawSidebarDocumentTree = (tree) => {
    const text = `
      <ul>
      ${tree
        .map(
          ({ id, title, documents }) => `
      <div class='documents-tree'>
        <li data-id="${id}">
        ▶️${title}
        <button class="add-button"> + </button>
        <button class="delete-button"> - </button>
        </li>
        ${documents.map((document) => drawSidebarDocumentTree([document])).join('')}
      </div>
      `,
        )
        .join('')}
      </ul>
      `;
    return text;
  };

  this.render = () => {
    const documentsTree = drawSidebarDocumentTree(this.state);
    const documentAddButton = `<button class="add-button">+ 페이지 추가하기</button>`;
    $sidebarDocumentTree.innerHTML = `
    <div class="tree">${documentsTree}${documentAddButton}</div>
    `;
  };

  this.render();

  $sidebarDocumentTree.addEventListener('click', (e) => {
    const $li = e.target.closest('li');
    const { className } = e.target;
    const id = $li?.dataset.id;
    if (className) {
      if (className === 'delete-button') {
        deleteDocument(id);
        return;
      } else {
        addDocument(id, className);
        return;
      }
    }
    if ($li) {
      push(`/documents/${id}`);
    }
  });
}
