import Component from "./Component/Component.js"
import DocumentTree from "./Component/DocumentTree.js"
import Editor from "./Component/Editor.js"
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
            }
          },
        ]
      }
    })

    new Editor({
      $target: $editor,
      initialState : DOCUMENT_DUMMY_DATA,
      props : {
        events: []
      }
    })
  }
}