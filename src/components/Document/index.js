import DocumentList from '@components/DocumentList';
import './style.css';

export default function Document({ $target, initialState }) {
  const $document = document.createElement('li');
  $document.className = 'Document';
  $target.appendChild($document);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { id, title, documents, isOpen = false } = this.state;

    const $documentContent = document.createElement('span');
    $documentContent.className = 'DocumentContent';
    $documentContent.style.display = isOpen ? 'block' : 'none';

    if (Array.isArray(documents) && documents.length > 0) {
      new DocumentList({ $target: $documentContent, initialState: documents }).setState(documents);
    } else {
      $documentContent.innerText = '문서가 없습니다. 🤔';
    }

    $document.innerHTML = `
      <div class="DocumentHeader" data-document-id=${id}>
        <h4 class="DocumentTitle">${title}</h4>
        <button class="addDocument">+</button>
      </div>
    `;

    $document.appendChild($documentContent);
  };
}
