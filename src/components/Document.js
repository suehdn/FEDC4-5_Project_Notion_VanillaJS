import { putDocument } from '../api';
import debounce from '../utils/debounce';
import { RouteService } from '../utils/RouteService';
import validateComponent from '../utils/validateComponent';

export default function Document({ targetElement, documentData, handleEditTitle, handleAsyncEditTitle }) {
  validateComponent(this, Document);
  this.init = () => {
    this.targetElement = targetElement;
    this.setEvent();
    this.render();
  };

  this.setEvent = () => {
    const debouncedInputHandler = debounce(async (e) => {
      const [titleElement, contentElement] = targetElement.children;

      await putDocument(documentData.id, {
        title: titleElement.value,
        content: contentElement.value,
      });

      if (e.target.classList.contains('document-title')) {
        handleAsyncEditTitle();
      }
    }, 500);

    targetElement.addEventListener('input', (e) => {
      const [titleElement] = targetElement.children;
      if (e.target.classList.contains('document-title')) {
        handleEditTitle(documentData.id, titleElement.value);
      }
      debouncedInputHandler(e);
    });

    targetElement.addEventListener('click', (e) => {
      if (!e.target.closest('.sub-document-links > button')) return;
      const router = new RouteService();
      router.push(`/documents/${e.target.dataset.id}`);
    });
  };

  this.render = () => {
    const { title, content, documents } = documentData;
    targetElement.innerHTML = `
      <input class="document-title" type="text" placeholder="제목 없음"/>
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
