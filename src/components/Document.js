import { getDocument, putDocument } from '../api';
import debounce from '../utils/debounce';

export default function Document({ targetElement }) {
  this.init = () => {
    this.targetElement = targetElement;
    this.setEvent();
    this.render();
  };

  this.state = { documentId: null };

  this.setState = (nextState) => {
    this.state = { ...nextState };
    this.render();
  };

  this.setEvent = () => {
    const debouncedKeyupHandler = debounce((e) => {
      const [titleElement, contentElement] = targetElement.children;

      putDocument(this.state.documentId, {
        title: titleElement.value,
        content: contentElement.value,
      });

      if (e.target.classList.contains('document-title')) {
        targetElement.dispatchEvent(new CustomEvent('editdocument', { bubbles: true }));
      }
    }, 1000);

    targetElement.addEventListener('keyup', debouncedKeyupHandler);
  };

  this.render = async () => {
    const { documentId } = this.state;
    if (!documentId) {
      targetElement.innerHTML = '';
      return;
    }

    const { title, content } = await getDocument(documentId);
    targetElement.innerHTML = `
      <input class="document-title"/>
      <textarea class="document-content"></textarea>
    `;
    const [documentTitleElement, documentContentElement] = targetElement.children;

    documentTitleElement.value = title;
    documentContentElement.value = content;
  };

  this.init();
}
