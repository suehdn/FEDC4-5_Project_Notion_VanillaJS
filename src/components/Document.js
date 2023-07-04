import { isConstructor } from "@Utils/validation";

export default function Document({ $target }) {
  if (!isConstructor(new.target)) {
    return;
  }

  const $textarea = document.createElement("textarea");

  this.state = {
    documentId: 0,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $target.appendChild($textarea);
    $textarea.value = this.state.documentId;
  };
}
