import express from "express";
import auth from "../middlewares/Auth.js";
import * as controller from "../controllers/controllers.js";
import upload from "../middlewares/multer.js";

const router = express.Router();
router.route("/login").post(controller.login);
router.route("/signup").post(controller.signup);
router
  .route("/addmovies")
  .post(auth, upload.single("image"), controller.addmovies);
router.route("/getmovies").get(controller.getmovies);
router.route("/getmovie/:id").get(controller.getmovie);
router.route("/getreview/:id").get(controller.getreview);
router.route("/updaterating/:id").post(auth, controller.updaterating);
router.route("/postreview/:movieid").post(auth, controller.postreview);
router.route("/getuser").get(auth, controller.getuser);
router.route("/getusers").get(auth, controller.getusers);
export default router;
