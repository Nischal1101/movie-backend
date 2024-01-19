import mongoose from "mongoose";
const movieSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rated: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});
const Movies = mongoose.model("movie", movieSchema);
export default Movies;
