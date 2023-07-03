import { getDocument, getDocumentList, updateDocument } from '@api/document';

import { setItem } from '@utils/localStorage';

import Component from '@core/Component';

import NotionDocument from '@components/NotionDocument/NotionDocument';
import NotionSidebar from '@components/NotionSidebar/NotionSidebar';

import './NotionPage.css';

export default class NotionPage extends Component {
  timer = null;

  initComponent() {
    this.$page = document.createElement('div');
    this.$page.className = 'notion-page';
    this.$target.appendChild(this.$page);
  }

  initChildComponents() {
    const { getDocumentId } = this.props;
    this.$sidebar = new NotionSidebar(this.$page, { getDocumentId });
    this.$document = new NotionDocument(this.$page, {
      getDocumentId,
      onEdit: this.onEdit.bind(this),
    });
  }

  get documentId() {
    const { getDocumentId } = this.props;
    return getDocumentId();
  }

  async fetchDocumentList() {
    const { documentId } = this;

    const documentList = await getDocumentList();
    this.$sidebar.setState({ documentId, documentList });
  }

  async fetchDocumentData() {
    const { documentId } = this;

    if (documentId === null) {
      this.$document.setState({ documentData: { id: documentId } });
      return;
    }

    const documentData = await getDocument(documentId);
    this.$document.setState({ documentData });
  }

  onEdit(name, document) {
    if (this.timer !== null) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(async () => {
      setItem(`temp-post-${document.id}`, {
        ...document,
        tempSaveDate: new Date(),
      });

      const updatedDocument = await updateDocument(document.id, document);
      if (name === 'title') {
        this.fetchDocumentList();
      }

      this.$document.setState({ documentData: updatedDocument });
    }, 1000);
  }

  setState(newState) {
    super.setState(newState);

    this.fetchDocumentList();
    this.fetchDocumentData();
  }
}
