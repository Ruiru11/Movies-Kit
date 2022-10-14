const express = require("express");
const mongoose = require("mongoose");
const request = require("request");
const bodyParser = require("body-parser");
const passport = require("passport");
const MovieDb = require("./models/movies");
const moviesRoutes = require("./routes/endpoints/movies");
const userRoutes = require("./routes/api/users");

// Set up default mongoose connection
const mongoDB = "mongodb://127.0.0.1/movieDb";
mongoose
  .connect(mongoDB, { useNewUrlParser: true })
  .then(() => console.log("connection to the database successful"))
  .catch((err) => console.log(err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.on("connecting", () => {
  console.log("connecting");
  console.log(db.readyState); //logs 2
});
db.on("connected", () => {
  console.log("connected");
  console.log(db.readyState); //logs 1
});

// here i decided to "dumb" the data from the api all at once in my db.
// this allows anyone access to this data if they setup the project correctly
// i check for any records and if none i insert so this is only activated if the DB is empty

request(
  {
    url: "https://imdb-api.com/en/API/InTheaters/k_z6lalr8i",
    headers: {
      "Content-Type": "application/json",
    },
  },
  async function (error, response, body) {
    const movies = await MovieDb.find();

    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      if (movies.length === 0) {
        MovieDb.insertMany(
          data.items.map((mt) => ({
            title: mt.title,
            releaseState: mt.releaseState,
            image: mt.image,
            runtimeMins: mt.runtimeMins,
            plot: mt.plot,
            imDbRating: mt.imDbRating,
            genres: mt.genres,
            genreList: mt.genreList,
            starList: mt.starList,
            directorList: mt.directorList,
          }))
        )
          .then(() => console.log("done insert"))
          .catch((e) => console.log("insert failed", e));
      }
      console.log("body"); // Print the google web page.
    }
  }
);
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

// this initializes the JWT passport strategy used for authorization
app.use(passport.initialize());
require("./utils/Config/passport")(passport);
app.use("/api/v1/", moviesRoutes);
app.use("/api/users", userRoutes);
const PORT = 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.log("errrr");
  }
  return console.log("running on port", PORT);
});
