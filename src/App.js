import Component from "./Component/Component.js"
import DocumentTree from "./Component/DocumentTree.js"

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
      initialState : {},
      props : {}
    })

    new DocumentTree({
      $target : $documentTree,
      initialState : {},
      props : {}
    })
  }
}