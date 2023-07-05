import NotionList from "./NotionList.js";
import { request } from "../utils/api.js";
import ToggleButton from "./ToggleButton.js";

export default function NotionPage({
  $target,
  initialState,
  onClick,
  onAdd,
  onDelete,
  $editorPage,
  $toggleBtn,
}) {
  const $page = document.createElement("div");

  $page.className = "notionPage";

  $target.appendChild($page);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const toggleBtn = new ToggleButton({
    $target: $page,
    onClick: () => {
      $target.style.transform = "translateX(-100%)";
      $editorPage.style.marginLeft = "-110px";
      $toggleBtn.style.transform = "translateX(0)";
    },
  });

  const notionList = new NotionList({
    $target: $page,
    initialState: this.state,
    onClick,
    onAdd,
    onDelete,
  });

  this.render = () => {
    fetchNotionList();
  };

  const fetchNotionList = async () => {
    const storedNotions = await request("/documents");
    notionList.setState(storedNotions);
  };

  this.render();
}
