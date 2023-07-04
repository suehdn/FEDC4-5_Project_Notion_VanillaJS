import { getDocument, getDocuments } from '../api';
import Document from '../components/Document';
import SideBar from '../components/SideBar';
import validateComponent from '../utils/validateComponent';

export default function EditPage({ targetElement }) {
  validateComponent(this, EditPage);
  this.init = () => {
    this.targetElement = targetElement;
    this.render();
  };

  this.render = async () => {
    const documentId = window.location.pathname.split('/')[2];
    const [documents, documentData] = await Promise.all([getDocuments(), getDocument(documentId)]);
    if (!documents || !documentData) return;

    targetElement.innerHTML = `
      <div class="side-bar"></div>
      <div class="selected-document"></div>
    `;
    const [sideBarElement, selectedDocumentElement] = targetElement.children;
    this.sideBar = new SideBar({ targetElement: sideBarElement, documents });
    this.selectedDocument = new Document({
      targetElement: selectedDocumentElement,
      documentData,
      handleEditTitle: (documentId, title) => {
        const documentTreeElement = document.querySelector(`.document-tree[data-id="${documentId}"]`);
        const documentTitleElement = documentTreeElement.querySelector('.document-blob-title');
        documentTitleElement.textContent = title;
      },
      handleAsyncEditTitle: async () => {
        this.sideBar.setState({ ...this.sideBar.state, documents: await getDocuments() });
      },
    });
  };

  this.init();
}
