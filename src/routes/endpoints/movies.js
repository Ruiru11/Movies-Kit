const express = require("express");
const passport = require("passport");
const { GetMovies, UpdateMovie } = require("../../utils/posts");

const api = express.Router();

// we pass JWT authenticate to ensure the endpoints require authentication

api.get("/movies", passport.authenticate("jwt", { session: false }), GetMovies);

api.put(
  "/movie/:id",
  passport.authenticate("jwt", { session: false }),
  UpdateMovie
);

module.exports = api;
