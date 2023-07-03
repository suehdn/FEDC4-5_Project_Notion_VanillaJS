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
