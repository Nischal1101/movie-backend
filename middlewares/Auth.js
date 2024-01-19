import { SECRET } from "../config/index.js";
import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  try {
    const coming = req.headers.authorization;
    console.log(coming);
    if (!coming) {
      return res.json({ msg: "User not authorized cox of empty token" });
    }
    const token = coming.split(" ")[1];
    const { id } = jwt.verify(token, SECRET);
    if (!id) {
      return res.json({ msg: "User not authorized" });
    }
    req.user = id;
    next();
  } catch (error) {
    console.log(error);
  }
};
export default auth;
