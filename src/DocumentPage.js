import { DocumentList } from "./Components/DocumentList.js";
export function DocumentPage ($target) {
    const $documentPage = document.createElement('div');
    $documentPage.className = 'documentPage'
    $target.appendChild($documentPage);
    this.state = {
      documentData: [
        {
          "id": 1, // Document id
          "title": "1번부모", // Document title
          "documents": [
            {
              "id": 2,
              "title": "1-1",
              "documents": [
                {
                  "id": 3,
                  "title": "1-1-1",
                  "documents": []
                }
              ]
            },
            {
              "id": 4,
              "title": "1-2",
              "documents": []
            }
          ]
        },
        {
          "id": 5,
          "title": "2번부모!",
          "documents": []
        }
    ],
      selectedId : null,
    }
    const documentList = new DocumentList({
      $target: $documentPage, 
      data: this.state.documents
    })
    

    this.setState = (nextState) => {
      documentList.setState({nextState});
    }

    this.render = () => {
      $documentPage.innerHTML =''
      if(this.state.documentData.length > 0){
        this.state.documentData.forEach((data) => {
          const $documentList = document.createElement('div');
          $documentList.className = `box-${data.id}`
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
}