import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  movieid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movies",
  },
  name: {
    type: mongoose.Schema.Types.String,
    ref: "Users",
  },
  rating: {
    type: Number,
    default: 0,
  },
  thought: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    default: new Date().getTime(),
  },
});
const Reviews = mongoose.model("review", reviewSchema);
export default Reviews;
