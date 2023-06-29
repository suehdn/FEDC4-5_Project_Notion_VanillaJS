import { DocumentList } from "./Components/DocumentList.js";
import { request } from './request.js';
export function DocumentPage ($target) {
    const $documentPage = document.createElement('div');
    $documentPage.className = 'documentPage'
    $target.appendChild($documentPage);
    this.state = {
      documentData: [],
      selectedId : null,
    }
    
    this.setState = (nextState) => {
      this.state = nextState
    }
    
    const fetchDocuments = async() => {
      const documentData = await request('/documents', {
        method: "GET",
      });
      this.setState({
        ...this.state,
        documentData
      })
      this.render()
    }

    this.render = () => {
      $documentPage.innerHTML =''
      if(this.state.documentData && this.state.documentData.length > 0){
        this.state.documentData.forEach((data) => {
          const $documentList = document.createElement('div');
          $documentList.className = `root-${data.id}`
          $documentPage.appendChild($documentList);
          const documentList = new DocumentList({
            $target: $documentList,
            data: [data],
            depth: 0,
            initialState:{
              parent: data.id,
              selectedNode: data.id,
              isOpen: false,
              depth: 0
            }
          })
          documentList.render()
        })
      }
    }
    fetchDocuments();
}