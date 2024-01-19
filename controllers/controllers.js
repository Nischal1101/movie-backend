import Movies from "../models/movieSchema.js";
import { PORT } from "../config/index.js";
import Reviews from "../models/reviewSchema.js";
import Users from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { SECRET } from "../config/index.js";
import asyncMiddleware from "../middlewares/async.js";

export const addmovies = asyncMiddleware(async (req, res) => {
  const { description, title, year, rated, rating } = req.body;
  const filepath = `http://localhost:${PORT}/uploads/` + req.file.filename;
  const doc = await Movies.create({
    description,
    title,
    image: filepath,
    year,
    rating,
    rated,
  });

  if (!doc) {
    return res.json({ msg: "Movie not added!!" });
  }
  return res.status(201).json({ msg: "Successfully added movie", filepath });
});

export const login = asyncMiddleware(async (req, res) => {
  const { email, password } = req.body;
  const doc = await Users.findOne({ email });
  console.log(doc);
  if (!doc) {
    return res.json({ msg: "no doc with email Credentials...!" });
  }

  const match = await bcrypt.compare(password, doc.password);

  if (!match) {
    return res.json({ msg: " not match Incorrect Credentials...!" });
  }
  const token = jwt.sign({ id: doc._id }, SECRET, { expiresIn: "1y" });
  return res.json({ msg: "User Successfully logged in ", token });
});

export const signup = asyncMiddleware(async (req, res) => {
  const { name, email, password } = req.body;
  const emailExists = await Users.findOne({ email });

  if (emailExists) {
    return res.status(409).json({ msg: "Email already registered" });
  }
  const hashedpw = await bcrypt.hash(password, 10);
  const doc = await Users.create({
    name,
    email,
    password: hashedpw,
  });
  // const token = jwt.sign({ id: doc._id }, SECRET, { expiresIn: "1y" });
  return res.json({ doc });
});
export const getmovies = asyncMiddleware(async (req, res) => {
  const doc = await Movies.find();
  return res.json(doc);
});

export const getreview = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const doc = await Reviews.findOne({ movieid: id });

  if (!doc) {
    return res.json({ msg: "Review not found..!" });
  }
  res.status(201).json(doc);
});

export const postreview = asyncMiddleware(async (req, res) => {
  const { rating, thought } = req.body;
  const { movieid } = req.params;
  const user = await Users.findOne({ _id: req.user });

  await Reviews.create({
    movieid,
    name: user.name,
    rating,
    thought,
    timestamp: new Date(new Date().getTime()).toLocaleString(),
  });
  return res.json({ msg: "Review Successfully posted...!" });
});
export const getuser = asyncMiddleware(async (req, res) => {
  const doc = await Users.findOne({ _id: req.user }).select("-password");
  res.status(200).json({ doc });
});
export const getusers = asyncMiddleware(async (req, res) => {
  const doc = await Users.find({});
  return res.status(200).json({ doc });
});

export const getmovie = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const doc = await Movies.findOne({ _id: id });
  res.status(201).json(doc);
});
export const updaterating = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const doc = await Movies.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  return res.status(201).json(doc);
});
