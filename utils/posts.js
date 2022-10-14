const { getAllMovies, updateMovie } = require("../routes/api/movies");

export const GetMovies = (req, res, next) => {
  getAllMovies()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(200).json({ message: err.message });
      next(err);
    });
};

export const UpdateMovie = (req, res, next) => {
  updateMovie(req.params.id)
    .then((response) => {
      res.status(200).json({ message: "Movie added to favorite", response });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      next(err);
    });
};
