import DocumentsPage from "./DocumentsPage.js";
import EditorPage from "./EditorPage.js";
import { request } from "./api.js";
import { initRoute, push } from "./router.js";
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
        : { content: "", title: "", id: this.state.selectedDocumentId }
    );
    this.render();
  };

  this.render = () => {
    const { selectedDocumentId } = this.state;
    $documentContentPage.style.display = selectedDocumentId ? "flex" : "none";
  };

  this.render();

  const documentPage = new DocumentsPage({
    $target: $documentListPage,
    initialState: this.state.documentsList,
    onAdd: async (selectedDocumentId) => {
      const result = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify({
          title: "제목 없음",
          parent: selectedDocumentId,
        }),
      });
      await fetchDocumentList();
    },
    onContentView: async (selectedDocumentId) => {
      push(`/documents/${selectedDocumentId}`);
    },
    onRemove: async (selectedDocumentId) => {
      await request(`/documents/${selectedDocumentId}`, {
        method: "DELETE",
      });
      await fetchDocumentList();
    },
  });

  let timer = null;

  const editorPage = new EditorPage({
    $target: $documentContentPage,
    initialState: {
      title: "",
      content: "",
    },
    onEditing: (documentInfo) => {
      const { id, title, content } = documentInfo;

      $target.querySelector(`div[data-document-id="${id}"]`).innerText = title;
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        await request(`/documents/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            title,
            content,
          }),
        });
      }, 2000);
    },
  });

  const fetchDocumentList = async () => {
    const documentsList = await request(`/documents`);
    this.setState({ ...this.state, documentsList });
  };

  fetchDocumentList();

  this.route = async () => {
    const { pathname } = window.location;
    if (pathname === "/") {
      this.setState({ ...this.state, selectedDocumentId: null });
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , selectedDocumentId] = pathname.split("/");
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
    }
  };

  initRoute(() => this.route());

  this.route();

  window.addEventListener("popstate", () => {
    this.route();
  });
}
