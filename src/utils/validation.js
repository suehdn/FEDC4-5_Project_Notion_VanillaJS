import { ERROR, ValidationError } from "./Errors";

export function isConstructor(newTarget) {
  try {
    if (!newTarget) {
      throw new ValidationError(ERROR.NEW_MISSED);
    }
  } catch (err) {
    console.error(err.name + ": " + err.message);
    return false;
  }

  return true;
}

export function isObjectState(target) {
  try {
    if (target === null || !(typeof target === "object")) {
      throw new TypeError(ERROR.NONE_OBJECT_STATE);
    }
  } catch (err) {
    console.error(err.name + ": " + err.message);
    return false;
  }

  return true;
}
