import CustomError from "../utils/CustomError";
function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (err) {
      const error = CustomError(err.message, 501);
      next(error);
    }
  };
}
export default asyncMiddleware;
