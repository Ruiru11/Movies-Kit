const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: {
    type: String,
  },
  releaseState: {
    type: String,
  },
  image: {
    type: String,
  },
  runtimeMins: {
    type: String,
  },
  plot: {
    type: String,
  },
  imDbRating: {
    type: String,
  },
  genres: {
    type: String,
  },
  genreList: [
    {
      key: String,
      value: String,
    },
  ],
  starList: [
    {
      id: String,
      name: String,
    },
  ],
  directorList: [
    {
      id: String,
      name: String,
    },
  ],
  favorite: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("movies", MovieSchema);
