import { listMaker } from "./DocumentListMaker.js";

export default function DocumentList({ $target, initialState, username }) {
  const $documentList = document.createElement("div");
  const $header = document.createElement("header");
  $header.innerHTML = `<h3><span style="font-size: 30px;">${username}</span>의 노션 페이지</h3>`;

  $target.appendChild($header);
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
