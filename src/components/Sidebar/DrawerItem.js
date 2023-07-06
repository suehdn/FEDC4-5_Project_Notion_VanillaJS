import { once } from "@Utils/once";
import { isConstructor, isDrawerItemState } from "@Utils/validation";
import Drawer from "./Drawer";
import "./DrawerItem.css";
import { postDocument } from "@Utils/apis";
import { patchSidebarState } from "@Utils/stateSetters";

export default function DrawerItem({ $target, $sibling, level }) {
  if (!isConstructor(new.target)) {
    return;
  }

  const $item = document.createElement("div");
  const $titleContainer = document.createElement("div");
  const $childrenDrawer = new Drawer({ $target: $item, level: level + 1 });

  this.state = { id: 0, title: "", documents: [] };

  this.setState = (nextState) => {
    if (!isDrawerItemState(nextState)) {
      return;
    }

    this.state = nextState;

    this.render();
  };

  this.opened = false;

  this.setOpened = (nextOpened) => {
    this.opened = nextOpened;
    this.toggleOpen();
  };

  this.toggleOpen = () => {
    const $openBtn = $item.querySelector(".drawer-item-open-button");
    $openBtn.className = `drawer-item-open-button${
      this.opened ? " opened" : ""
    }`;

    $childrenDrawer.root.style.display = this.opened ? "block" : "none";
  };

  this.init = once(() => {
    $target.insertBefore($item, $sibling);
    $item.insertAdjacentElement("afterbegin", $titleContainer);

    $titleContainer.className = "drawer-item-container";
    $titleContainer.innerHTML = `
      <button class="drawer-item-open-button" data-action="open">></button>
      <p class="drawer-item-title" data-action="route">${this.state.title}</p>
      <div>
        <button data-action="remove">x</button>
        <button data-action="append">+</button>
      </div>
    `;

    $titleContainer.addEventListener("click", async (e) => {
      const $actionElement = e.target.closest("[data-action]");
      if (!$actionElement) return;

      const { action } = $actionElement.dataset;

      if (action === "open") {
        this.setOpened(!this.opened);
      } else if (action === "append") {
        const newDocument = postDocument({
          title: "제목없음",
          parent: this.state.id,
        });
        if (newDocument) {
          patchSidebarState();
        }
      }
    });

    this.toggleOpen();
  });

  this.render = () => {
    this.init();

    const $title = $item.querySelector(".drawer-item-title");
    $title.innerText = this.state.title;

    $childrenDrawer.setState(this.state.documents);
  };
}
