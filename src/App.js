import Component from './Component/Component.js'
import DocumentTree from './Component/DocumentTree.js'
import Editor from './Component/Editor.js'
import { getItem,setItem,removeItem } from './storage/storage.js'
import { DOCUMENT_DUMMY_DATA, DOCUMENT_TREE_DUMMY_DATA } from "./DUMMY_DATA.js"

export default class App extends Component{

  render(){
    this.$target.innerHTML = 
    `
      <aside id='documentTree'></aside>
      <section id='editor'>편집하는 곳</section>
    `

    const $documentTree = this.$target.querySelector('#documentTree')
    const $editor = this.$target.querySelector('#editor')
    new DocumentTree({
      $target : $documentTree,
      initialState : DOCUMENT_TREE_DUMMY_DATA,
      props : {
        events:[
          {
            action:'click',
            tag:'a',
            callback: (event) => {
              event.preventDefault();
              history.pushState(null,null,event.target.href)
              this.route()
            }
          },
        ]
      }
    })

    this.editor = new Editor({
      $target: $editor,
      initialState : { content : "환영합니다!"},
      props : {
        events: [
          {
            action:'keyup',
            tag:'textarea',
            callback: (event) => {
              const {value, dataset} = event.target
              const key = 'document='+dataset.id
              setItem(key,{
                tmpSaveDate : new Date(),
                content : value
              })
            }
          }
        ]
      }
    })
  }

  route(){
    const { pathname } = window.location
    const [,documentId] = pathname.split('=')
    const tmpDocument = getItem('document='+documentId)
    // fetchData = `https://kdt-frontend.programmers.co.kr/documents/%7BdocumentId%7D${documentId}`
    const FETCH_DUMMY_DATA = {
      "id": 1,
      "title": "노션을 만들자",
      "content": "즐거운 자바스크립트의 세계!",
      "documents": [
        {
          "id": 2,
          "title": "",
          "createdAt": "",
          "updatedAt": ""
        }
      ],
      "createdAt": "",
      "updatedAt": "2022-06-30T07:34:33.979Z"
    }
    console.log(tmpDocument)
    if(tmpDocument) console.log(tmpDocument.tmpSaveDate)
    if(tmpDocument && tmpDocument.tmpSaveDate > FETCH_DUMMY_DATA.updatedAt){
      console.log('here')
      if(confirm('임시저장된 데이터가 있습니다. 불러오시겠습니까?')){
        this.editor.state = tmpDocument
        return
      }
    }
    this.editor.state = DOCUMENT_DUMMY_DATA
  }
}