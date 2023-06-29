function navDraw(documents, $target) {
  const $div = document.createElement("div");
  $div.style = "padding-left: 10px";
  if ($target.parentNode.tagName.toLowerCase() !== "main")
    $div.style.setProperty("display", "none");
  $target.appendChild($div);

  $div.addEventListener("click", (e) => {
    const children = e.target.childNodes;
    for (let i = 0; i < children.length; i++) {
      if (
        children[i].nodeType === 1 &&
        children[i].tagName.toLowerCase() === "div"
      )
        children[i].style.setProperty("display", "block");
    }
  });

  for (let i = 0; i < documents.length; i++) {
    const $list = document.createElement("div");
    $list.setAttribute("data-id", documents[i].id);
    $list.innerText = documents[i].title;
    $div.append($list);
    if (documents[i].documents.length !== 0)
      navDraw(documents[i].documents, $list);
  }

  return $div;
}

export default function Sidebar({ $target, initialState }) {
  const $nav = document.createElement("nav");
  const $button = document.createElement("button");
  $nav.innerText = "사이드바";
  $button.innerText = "+";

  $target.appendChild($nav);
  $nav.appendChild($button);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    navDraw(this.state, $nav);
  };

  this.render();
}
