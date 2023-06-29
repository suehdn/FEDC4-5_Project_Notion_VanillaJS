import Component from "./Component/Component.js"
import DocumentTree from "./Component/DocumentTree.js"
import { DOCUMENT_TREE_DUMMY_DATA } from "./DUMMY_DATA.js"

export default class App extends Component{

  render(){
    this.$target.innerHTML = 
    `
      <aside id='documentTree'>글 트리</aside>
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
              console.log(event.target.href)
              history.pushState(null,null,event.target.href)
            }
          },
        ]
      }
    })
  }
}