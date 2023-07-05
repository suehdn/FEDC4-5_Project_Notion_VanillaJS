export const stateSetters = {};

export function registerStateSetter(component) {
  const name = component.constructor.name;
  if (name && component.setState instanceof Function) {
    stateSetters[name] = (nextState) => component.setState(nextState);
  }
}
