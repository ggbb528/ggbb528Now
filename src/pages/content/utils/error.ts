export class AppError extends Error {
  appMsg: string;

  constructor(msg: string) {
    super(msg);
    this.appMsg = msg;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
