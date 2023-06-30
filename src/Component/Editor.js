import Component from "./Component.js";

export default class Editor extends Component{

  render(){
    this.$target.innerHTML = 
    `
      <textarea id='editorTextarea' data-id=${this.state.id}>
        ${ this.state.content }
      </textarea>
      <button class='saveButton'>저장</button>
    `
  }
}