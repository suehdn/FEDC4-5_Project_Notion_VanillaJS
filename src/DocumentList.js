export default function DocumentList({ $target, initialState }) {
  const $documentList = document.createElement('div');

  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const renderDocuments = (documents) => {
    return `
      <ul>
        ${documents
          .map(
            (document) =>
              `<li data-id="${document.id}">
                ${document.title}
                <button>+</button>
                ${document.documents && renderDocuments(document.documents)}
              </li>`
          )
          .join('')}
      </ul>
    `;
  };

  this.render = () => {
    $documentList.innerHTML = `
      ${renderDocuments(this.state)}
    `;
  };

  this.render();
}
