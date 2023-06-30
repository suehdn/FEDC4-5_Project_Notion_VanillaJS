import Component from "./Component.js";

export default class DocumentTree extends Component{

  render(){
    this.$target.innerHTML = 
    `
      <ul>
        ${this.state.map((document) => 
           
          `
          <li id="document-${document.id}" class="document">
            <a href='documents=${document.id}'>${document.title}</a>
            <button class="documentAddButton">+</button>
          </li>
          `
          ).join('')}
      </ul>
    `
  }
}