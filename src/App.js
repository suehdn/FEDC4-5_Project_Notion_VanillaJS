import DocumentsPage from "./DocumentsPage.js";
import EditorPage from "./EditorPage.js";
import { request } from "./api.js";
import { setItem } from "./storage.js";

export default function App({ $target, documentsList }) {
  const $documentListPage = document.createElement("div");
  const $documentContentPage = document.createElement("div");

  $documentListPage.setAttribute("class", "global-nav");
  $documentContentPage.setAttribute("class", "editor-page");
  $target.appendChild($documentListPage);
  $target.appendChild($documentContentPage);

  this.state = {
    selectedDocumentId: null,
    documentsList: [],
    documentContent: {},
  };

  this.setState = (newState) => {
    this.state = newState;
    if (documentPage.state !== this.state.documentsList) {
      documentPage.setState(this.state.documentsList);
    }
    editorPage.setState(
      this.state.documentContent.title
        ? this.state.documentContent
        : { content: "", title: "" }
    );
    this.render();
  };

  this.render = () => {
    const { selectedDocumentId } = this.state;
    $documentContentPage.style.display = selectedDocumentId ? "block" : "none";
  };

  this.render();

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
      this.setState({
        ...this.state,
        documentContent,
        selectedDocumentId,
      });
    },
    onEdit: () => {},
    onRemove: () => {},
  });

  const editorPage = new EditorPage({
    $target: $documentContentPage,
    initialState: {
      title: "",
      content: "",
    },
    onEditing: (documentInfo) => {
      setItem(`${documentInfo.id}`, documentInfo);
    },
  });

  const fetchDocumentList = async () => {
    const documentsList = await request(`/documents`);
    console.log(documentsList);
    this.setState({ ...this.state, documentsList });
  };

  fetchDocumentList();
}
