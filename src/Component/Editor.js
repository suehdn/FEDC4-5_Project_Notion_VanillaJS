import Component from "./Component.js";

export default class Editor extends Component {
  render() {
    console.log(this.state);
    this.$target.innerHTML = `
      <div  >
        <div contentEditable=true name='textarea' id='textarea'>
          ${this.state.content || ""}
        </div>
        <button contentEditable=false class='saveButton'>저장</button>
      </div>
    `;
  }
}
