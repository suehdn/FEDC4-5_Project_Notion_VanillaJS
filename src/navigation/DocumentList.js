import { listMaker } from "./DocumentListMaker.js";

export default function DocumentList({ $target, initialState, onPostClick }) {
  const $documentList = document.createElement("div");
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const $ul = document.createElement("ul");
    this.state.map((item) => $ul.appendChild(listMaker(item)));
    $documentList.appendChild($ul);
  };

  this.render();
}
