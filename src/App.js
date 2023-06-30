import DocumentsPage from "./DocumentsPage.js";
import EditorPage from "./EditorPage.js";
import { request } from "./api.js";

export default function App({ $target, documentsList }) {
  const $documentListPage = document.createElement("div");
  const $documentContentPage = document.createElement("div");

  $target.appendChild($documentListPage);
  $target.appendChild($documentContentPage);

  this.state = {
    documentsList: [],
    documentContent: {},
  };

  this.setState = (newState) => {
    this.state = newState;
    documentPage.setState(this.state.documentsList);
    editorPage.setState(this.state.documentContent);
  };

  const documentPage = new DocumentsPage({
    $target: $documentListPage,
    initialState: this.state.documentsList,
    onAdd: async (selectedDocumentId, selectedDocumentTitle) => {
      const result = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify({
          title: selectedDocumentTitle,
          parent: selectedDocumentId,
        }),
      });
      await fetchDocumentList();
    },
    onContentView: async (selectedDocumentId) => {
      const documentContent = await request(
        `/documents/${selectedDocumentId}`,
        {
          method: "GET",
        }
      );
      this.setState({ ...this.state, documentContent: documentContent });
    },
    onEdit: () => {},
    onRemove: () => {},
  });

  const editorPage = new EditorPage({
    $target: $documentContentPage,
    initialState: [],
  });

  const fetchDocumentList = async () => {
    const documentsList = await request(`/documents`);
    console.log(documentsList);
    this.setState({ ...this.state, documentsList });
  };

  fetchDocumentList();
}
