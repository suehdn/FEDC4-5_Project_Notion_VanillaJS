import { getDocument, putDocument } from '../api';
import debounce from '../utils/debounce';
import { RouteService } from '../domain/RouteService';

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
    const debouncedKeyupHandler = debounce(async (e) => {
      const [titleElement, contentElement] = targetElement.children;

      await putDocument(this.state.documentId, {
        title: titleElement.value,
        content: contentElement.value,
      });

      if (e.target.classList.contains('document-title')) {
        targetElement.dispatchEvent(new CustomEvent('asyncEditTitle', { bubbles: true }));
      }
    }, 500);

    targetElement.addEventListener('keyup', (e) => {
      const [titleElement] = targetElement.children;
      if (e.target.classList.contains('document-title')) {
        targetElement.dispatchEvent(
          new CustomEvent('editTitle', {
            detail: {
              documentId: this.state.documentId,
              title: titleElement.value,
            },
            bubbles: true,
          }),
        );
      }
      debouncedKeyupHandler(e);
    });

    targetElement.addEventListener('click', (e) => {
      if (!e.target.closest('.sub-document-links > button')) return;
      const router = new RouteService();
      router.push(`/documents/${e.target.dataset.id}`);
    });
  };

  this.render = async () => {
    const { documentId } = this.state;
    if (!documentId) {
      targetElement.innerHTML = '';
      return;
    }

    const { title, content, documents } = await getDocument(documentId);
    targetElement.innerHTML = `
      <input class="document-title"/>
      <textarea class="document-content"></textarea>
      <div class="sub-document-links"></div>
    `;
    const [documentTitleElement, documentContentElement, subDocumentLinksElement] = targetElement.children;

    documentTitleElement.value = title;
    documentContentElement.value = content;
    documents.forEach(({ id, title }) => {
      const buttonElement = document.createElement('button');
      buttonElement.classList.add('sub-document-link-btn');
      buttonElement.setAttribute('data-id', id);
      buttonElement.textContent = title === '' ? '제목없음' : title;
      subDocumentLinksElement.appendChild(buttonElement);
    });
  };

  this.init();
}
