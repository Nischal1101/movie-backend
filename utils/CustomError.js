class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
  static alreadyExist(message) {
    return new CustomError(message, 409);
  }
  static notFound(message) {
    // console.log("1-CustomError.js");
    return new CustomError(message, 404);
  }
}
export default CustomError;
