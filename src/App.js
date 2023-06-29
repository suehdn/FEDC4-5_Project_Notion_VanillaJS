import Component from "./Component/Component.js"

export default class App extends Component{

  render(){
    this.$target.innerHTML = 
    `
      <aside id='documentTree'>글 트리</aside>
      <section id='editor'>편집하는 곳</section>
    `
  }
}