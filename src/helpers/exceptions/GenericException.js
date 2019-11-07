import * as httpStatus from 'http-status-codes';

export default class GenericException extends Error {
  constructor(params) {
    super(params.message);
    this.statusCode = params.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    this.name = params.name;
    this.extras = params.extras;
    this.errors = params.errors;

    Object.setPrototypeOf(this, GenericException.prototype);
  }

  formatError() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      extras: this.extras,
      errors: this.errors
    };
  }
}
