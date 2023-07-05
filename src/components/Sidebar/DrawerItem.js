import { once } from "@Utils/once";
import { isConstructor, isDrawerItemState } from "@Utils/validation";
import Drawer from "./Drawer";

export default function DrawerItem({ $target, $sibling }) {
  if (!isConstructor(new.target)) {
    return;
  }

  const $item = document.createElement("div");
  const $childrenDrawer = new Drawer({ $target: $item });

  this.state = {};

  this.setState = (nextState) => {
    if (!isDrawerItemState(nextState)) {
      return;
    }

    this.state = nextState;

    this.render();
  };

  this.init = once(() => {
    $target.insertBefore($item, $sibling);
  });

  this.render = () => {
    this.init();
    $item.insertAdjacentHTML("afterbegin", `<p>${this.state.title}</p>`);
    $childrenDrawer.setState(this.state.documents);
  };
}
