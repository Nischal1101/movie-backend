import dotenv from "dotenv";
dotenv.config();
export const { PORT, CONN_URI, SECRET, DEBUG_MODE } = process.env;
