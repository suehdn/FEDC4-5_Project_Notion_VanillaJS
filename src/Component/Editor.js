import Component from "./Component.js";

export default class Editor extends Component{

  render(){
    this.$target.innerHTML = 
    `
      <div  >
        <div contentEditable=true name='textarea' id='textarea' data-id=${this.state.id}>
          ${this.state.content}
        </div>
        <button contentEditable=false class='saveButton'>저장</button>
      </div>
    `
  }
}