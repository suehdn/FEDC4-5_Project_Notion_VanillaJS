export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

export const ERROR = {
  NEW_MISSED: "Current component is declared without 'new' keyword.",
};
