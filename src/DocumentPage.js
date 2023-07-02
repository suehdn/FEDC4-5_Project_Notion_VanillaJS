import { DocumentList } from "./Components/DocumentList.js";
import { request } from './request.js';
import { DocumentCreate } from "./Components/DocumentCreate.js";

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
          const createBtn = new DocumentCreate({
            $target: $documentPage, 
            parentId: null,
            onClick: () => {
               console.log('클릭함ㅋ');
          },
            onSubmit: async (content, parent) => {
              await request(`/documents`, {
                  method: "POST",
                  body: JSON.stringify({
                      title: content,
                      parent: parent,
                  })
              }) 
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
            onClick: () => {
                console.log("클릭클릭")
            },
              onSubmit: async (content, parent) => {
                const document = {
                    title : content,
                    parent,
                }
                await request(`/documents`, {
                    method: "POST",
                    body: JSON.stringify({
                        title: content,
                        parent: parent,
                    })
                }) 
                await fetchDocuments();
                }
          })
          createBtn.render();
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
            },
            onSubmit: async (content, parent) => {
              const document = {
                  title : content,
                  parent,
              }
              await request(`/documents`, {
                  method: "POST",
                  body: JSON.stringify({
                      title: content,
                      parent: parent,
                  })
              })
              await fetchDocuments();
              }
            })
            documentList.render()
        })
      }
    }
    fetchDocuments();
}