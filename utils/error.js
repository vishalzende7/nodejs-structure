const { HttpError } = require("http-errors");

class ApplicationError extends Error {
  constructor(message, details = null) {
    super();
    this.message = message || "An application error occured";
    this.name = "Application Error";
    this.details = details;
  }
}

class ValidationError extends ApplicationError {
  constructor(message, details) {
    super(message, details);
    this.name = "Validation Error";
  }
}

class NotFoundError extends ApplicationError {
  constructor(message, details) {
    super(message, details);
    this.name = "NotFoundError";
    this.message = message || "Entity not found";
  }
}

class ForbiddenError extends ApplicationError {
  /**
   * @param {String} message
   * @param {any} details
   */
  constructor(message, details) {
    super(message, details);
    this.name = "ForbiddenError";
    this.message = message || "Forbidden access";
  }
}

class UnauthorizedError extends ApplicationError {
  constructor(message, details) {
    super(message, details);
    this.name = "UnauthorizedError";
    this.message = message || "Unauthorized";
  }
}

class DatabaseError extends ApplicationError {
  constructor(message, details) {
    super(message, details);
    this.name = "DatabaseError";
    this.message = message || "Error occured while database operation";
  }
}

module.exports = {
  HttpError,
  ApplicationError,
  ValidationError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  DatabaseError
};
