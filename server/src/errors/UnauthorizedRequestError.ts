import { CustomError } from "./CustomError";

export class UnauthorizedRequestError extends CustomError {
  statusCode = 401;

  constructor() {
    super("Unauthorized");
    Object.setPrototypeOf(this, UnauthorizedRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: "Unauthorized" }];
  }
}
