import DocumentsPage from "./DocumentsPage.js";
import { request } from "./api.js";

export default function App({ $target, initialState }) {
  this.state = {
    initialState: [],
  };

  this.setState = (newState) => {
    this.state = newState;
    documentPage.setState(this.state.initialState);
  };

  const documentPage = new DocumentsPage({
    $target,
    initialState: this.state.initialState,
    onAdd: async (selectedDocumentId) => {
      console.log(selectedDocumentId);
      const result = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify({
          title: "문서 제목5",
          parent: 69730,
        }),
      });
      console.log(result);
    },
    onContentView: () => {},
    onEdit: () => {},
    onRemove: () => {},
  });

  const fetchDocumentList = async () => {
    const documentsList = await request(`/documents`);
    this.setState({ ...this.state, initialState: documentsList });
  };

  fetchDocumentList();
}
