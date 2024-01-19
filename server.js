import express from "express";
import cors from "cors";
import { PORT } from "./config/index.js";
import router from "./routers/routes.js";
import db from "./database/conn.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import CustomError from "./utils/CustomError.js";
import errorMiddleware from "./middlewares/error.js";
const app = express();
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/api", router);
app.all("*", (req, res, next) => {
  console.log(
    typeof CustomError.notFound(`Can't find ${req.originalUrl} on the server`)
  );
  next(CustomError.notFound(`Can't find ${req.originalUrl} on the server`));
});
app.use(errorMiddleware);
db()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`The port is listening at port address ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("connection failed" + err);
  });
