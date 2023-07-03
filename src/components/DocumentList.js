export default function DocumentList({ $target, initialState, onCreate, onDelete, onSelect }) {
  const $documentList = document.createElement('div');
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const renderDocuments = (documents, depth) => {
    return `
      <ul>
        ${
          documents.length > 0
            ? documents
                .map(
                  (document) =>
                    `<li data-id="${document.id}" class="document-item">
								      <div style="display:flex; justify-content:space-between; padding:1px 2px 1px ${depth * 10}px">
                        <button class="toggle">></button>
                        <div class="document-title">${document.title.length === 0 ? '제목 없음' : document.title}</div>
                        <div>
                          <button class="delete">-</button>
                          <button class="create">+</button>
                        </div>
                      </div>
                      ${document.documents.length > 0 ? renderDocuments(document.documents, depth + 1) : ''}
                    </li>`
                )
                .join('')
            : '페이지 없음'
        }
      </ul>
    `;
  };

  this.render = () => {
    $documentList.innerHTML = `
      ${renderDocuments(this.state.documents, 0)}
    `;
  };

  $documentList.addEventListener('click', (e) => {
    const $li = e.target.closest('.document-item');

    if ($li) {
      const { id } = $li.dataset;
      const { className } = e.target;

      if (className === 'toggle') {
      } else if (className === 'create') {
        onCreate(parseInt(id));
      } else if (className === 'delete') {
        onDelete(parseInt(id));
      } else {
        onSelect(parseInt(id));
      }
    }
  });

  this.render();
}
