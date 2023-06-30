import Component from "./Component.js";

export default class Editor extends Component{

  render(){

    this.$target.innerHTML = 
    `
      <textarea id='editorTextarea'>
        ${ this.state.content }
      </textarea>
    `
  }
}