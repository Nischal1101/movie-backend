import { DEBUG_MODE } from "../config/index.js";
import CustomError from "../utils/CustomError.js";
function errorHandler(err, req, res, next) {
  let statusCode = 5000;
  let data = {
    message: "Internal Server Error",
    ...(DEBUG_MODE === "true" && { originalError: err.message }),
  };
  if (err instanceof CustomError) {
    // console.log("1-error.js");
    console.log(err);
    statusCode = err.statusCode;
    data = {
      message: err.message,
    };
  }
  return res.status(statusCode).json(data);
}
export default errorHandler;
