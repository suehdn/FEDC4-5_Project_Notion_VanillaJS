export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

export const ERROR = {
  NEW_MISSED: "Current component is declared without 'new' keyword.",
  NONE_OBJECT_STATE: "Tried to set state using none object value.",
};
