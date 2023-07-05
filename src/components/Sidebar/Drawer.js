import { isConstructor, isDrawerState } from "@Utils/validation";
import DrawerItem from "./DrawerItem";
import { once } from "@Utils/once";
import "./Drawer.css";

export default function Drawer({ $target, level }) {
  if (!isConstructor(new.target)) {
    return;
  }

  const $drawer = document.createElement("nav");

  this.root = $drawer;

  this.state = [];

  this.renderingPlan = [];
  this.setState = (nextState) => {
    if (!isDrawerState(nextState)) {
      return;
    }

    setRenderingPlan(this.state, nextState, this.renderingPlan);

    this.state = nextState;

    this.render();
  };

  this.init = once(() => {
    $target.appendChild($drawer);
    $drawer.className = "drawer-nav";
    $drawer.style.paddingLeft = `${10 * level}px`;
  });

  this.render = () => {
    this.init();

    let $currentNode = $drawer.firstChild;
    let stateIdx = 0;

    this.renderingPlan.forEach((plan) => {
      if (plan === 0) {
        $currentNode = $currentNode.nextSibling;
        stateIdx += 1;
      } else if (plan > 0) {
        const $drawerItem = new DrawerItem({
          $target: $drawer,
          $sibling: $currentNode,
          level: 0,
        });
        $drawerItem.setState(this.state[stateIdx]);

        stateIdx += 1;
      } else {
        const $tempNextNode = $currentNode?.nextSibling;
        $drawer.removeChild($currentNode);
        $currentNode = $tempNextNode;
      }
    });
  };
}

/* plan 값
 * 0: 유지
 * 양수: 추가
 * 음수: 제거
 */
function setRenderingPlan(current, next, plan) {
  let ci = 0,
    ni = 0;
  while (ci < current.length || ni < next.length) {
    const cid = current[ci]?.id;
    const nid = next[ni]?.id;

    if (ci === current.length) {
      plan.push(nid);
      ni += 1;
    } else if (ni === next.length) {
      plan.push(-cid);
      ci += 1;
    } else if (cid === nid) {
      plan.push(0);
      ci += 1;
      ni += 1;
    } else if (cid === next[ni + 1].id) {
      // 요소는 하나씩 추가 및 제거된다고 가정
      plan.push(nid);
      ni += 1;
    } else if (nid === current[ci + 1].id) {
      plan.push(-cid);
      ci += 1;
    } else {
      // 가정에 어긋나는 데이터 입력시 남은 현재요소 전부 제거 후 다음요소 추가
      while (ci < current.length) {
        plan.push(-current[ci].id);
        ci += 1;
      }
    }
  }
}
