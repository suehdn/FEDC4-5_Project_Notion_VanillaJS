import { ERROR, ValidationError } from "./Errors";

function isError(condition, errorObj) {
  try {
    if (condition) {
      throw errorObj;
    }
  } catch (err) {
    console.error(err.name + ": " + err.message);
    return false;
  }

  return true;
}

export function isConstructor(newTarget) {
  return isError(!newTarget, new ValidationError(ERROR.NEW_MISSED));
}

export function isObjectState(state) {
  return isError(
    state === null || !(typeof state === "object"),
    new TypeError(ERROR.NONE_OBJECT_STATE)
  );
}

export function isDocumentState(state) {
  return (
    isObjectState(state) &&
    isError(
      (() => {
        for (const [key, type] of Object.entries({
          documentId: "number",
          title: "string",
          content: "string",
        })) {
          if (!state.hasOwnProperty(key)) return true;
          if (typeof state[key] !== type) return true;
        }
        return false;
      })(),
      new ValidationError(ERROR.INVALID_DOCUMENT_STATE)
    )
  );
}

export function isArrayState(state) {
  return isError(!Array.isArray(state), new TypeError(ERROR.NONE_ARRAY_STATE));
}

export function isSidebarState(state) {
  return (
    isArrayState(state) &&
    isError(
      (() => {
        for (const element of state) {
          for (const [key, type] of Object.entries({
            id: "number",
            title: "string",
            documents: "object",
          })) {
            if (!element.hasOwnProperty(key)) return true;
            if (typeof element[key] !== type) return true;
            if (key === document && !Array.isArray(element)) return true;
          }
          return false;
        }
      })(),
      new ValidationError(ERROR.INVALID_SIDEBAR_STATE)
    )
  );
}
