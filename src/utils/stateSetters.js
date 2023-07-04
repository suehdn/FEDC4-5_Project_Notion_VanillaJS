import { isObjectState } from "./validation";

export const stateSetters = {};

export function registerStateSetter(component) {
  const name = component.constructor.name;
  if (name && component.setState instanceof Function) {
    stateSetters[name] = (nextState) => component.setState(nextState);
  }
}

export function setState(state, nextState, render) {
  if (!isObjectState(nextState)) {
    return;
  }

  for (const [key, val] of Object.entries(nextState)) {
    if (state.hasOwnProperty(key)) {
      state.key = val;
    }
  }

  if (render instanceof Function) render();
}
