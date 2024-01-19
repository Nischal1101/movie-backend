import mongoose from "mongoose";
import { CONN_URI } from "../config/index.js";
const db = async () => {
  mongoose.set("strictQuery", false);
  const connection = mongoose.connect(CONN_URI);
  console.log("Database connected");
  return connection;
};
export default db;
