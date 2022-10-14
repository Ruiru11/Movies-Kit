const movieDb = require("../../models/movies");

export async function getAllMovies() {
  const movies = await movieDb.find();
  if (movies.length === 0) {
    throw {
      status: 200,
      message: "No movies ",
    };
  } else {
    return movies;
  }
}

export async function updateMovie(_id) {
  const movie = await movieDb.findOne({
    _id,
  });

  //   adding to favorites is a toggle  so we negate the current value to enable a toggle at any point

  if (movie) {
    movie.favorite = !movie.favorite;
    movie.save();
    return movie;
  }
  throw {
    status: 404,
    message: "movie does not exist",
  };
}
