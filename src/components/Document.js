import { getDocument } from '../api';

export default function Document({ targetElement }) {
  this.init = () => {
    this.targetElement = targetElement;
    this.render();
  };

  this.state = { documentId: null };

  this.setState = (nextState) => {
    this.state = { ...nextState };
    this.render();
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
