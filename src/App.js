import Component from './Component/Component.js'
import DocumentTree from './Component/DocumentTree.js'
import Editor from './Component/Editor.js'
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
        events: []
      }
    })
  }

  route(){
    const { pathname } = window.location
    console.log(pathname)
    const [,documentId] = pathname.split('=')

    this.editor.state = `https://kdt-frontend.programmers.co.kr/documents/%7BdocumentId%7D${documentId}`
    this.editor.state = DOCUMENT_DUMMY_DATA
  }
}