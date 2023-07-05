import { TARGET } from '@consts/target';

import { getDocument, getDocumentList, updateDocument } from '@api/document';

import documentStorage from '@utils/localStorage/documentStorage';

import Component from '@core/Component';

import NotionDocument from '@components/NotionDocument/NotionDocument';
import NotionSidebar from '@components/NotionSidebar/NotionSidebar';

import './NotionPage.css';

export default class NotionPage extends Component {
  initComponent() {
    this.$page = document.createElement('div');
    this.$page.className = TARGET.PAGE.NOTION;
    this.$target.appendChild(this.$page);
  }

  initChildComponents() {
    this.$sidebar = new NotionSidebar(this.$page);
    this.$document = new NotionDocument(this.$page, {
      onEdit: this.onEdit.bind(this),
    });
  }

  async fetchDocumentList() {
    const { documentId } = this.state;

    const documentList = await getDocumentList();
    this.$sidebar.setState({ documentId, documentList });
  }

  async fetchDocumentData() {
    const { documentId } = this.state;

    if (documentId === null) {
      this.$document.setState({
        isVisible: false,
        documentData: { id: documentId },
      });
      return;
    }

    const documentData = await getDocument(documentId);
    this.$document.setState({ isVisible: true, documentData });
  }

  async onEdit(name, document) {
    documentStorage.setDocumentItem(document);

    const updatedDocument = await updateDocument(document.id, document);
    if (name === 'title') {
      this.fetchDocumentList();
    }

    this.$document.setState({ isVisible: true, documentData: updatedDocument });
  }

  setState(newState) {
    super.setState(newState);

    this.fetchDocumentList();
    this.fetchDocumentData();
  }
}
