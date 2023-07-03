import { DocumentList } from "./Components/DocumentList.js";
import { DocumentCreate } from "./Components/DocumentCreate.js";
import { getDocuments, createDocuments } from "./api.js";
import { push } from "./router.js";

export function DocumentPage ($target) {
    const $documentPage = document.createElement('div');
    $documentPage.className = 'documentPage'
    $target.appendChild($documentPage);
    this.state = {
      documentData: []
    }
    
    this.setState = (nextState) => {
      this.state = nextState
    }
    
    const fetchDocuments = async() => {
      const documentData = await getDocuments();
      this.setState({
        ...this.state,
        documentData
      })
      this.render()
    }

    this.render = () => {
      $documentPage.innerHTML =''
          const createBtn = new DocumentCreate({
            $target: $documentPage, 
            parentId: null,
            onSubmit: async (content, parent) => {
              const createdData = await createDocuments(content, parent)
              const { id } = createdData;
              push(`/documents/${id}`);
              await fetchDocuments();
          }
      })
      createBtn.render();
      if(this.state.documentData && this.state.documentData.length > 0){
        this.state.documentData.forEach((data) => {
          const $documentList = document.createElement('div');
          $documentList.className = `root-${data.id}`
          const createBtn = new DocumentCreate({
            $target: $documentList, 
            parentId: data.id, 
              onSubmit: async (content, parent) => {
                const createdData = await createDocuments(content, parent)
                const { id } = createdData;
                push(`/documents/${id}`);
                await fetchDocuments();
              }
          })
          createBtn.render();
          $documentPage.appendChild($documentList);
          const documentList = new DocumentList({
            $target: $documentList,
            data: [data],
            initialState:{
              parent: data.id,
              selectedNode: data.id,
              isOpen: false,
              depth: 0
            },
            onSubmit: async (content, parent) => {
                await createDocuments(content, parent)
                await fetchDocuments();
              }
            })
            documentList.render()
        })
      }
    }
    fetchDocuments();
}