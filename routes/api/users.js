const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../models/users");
const validateRegisterInput = require("../../utils/Validation/register");
const validateLoginInput = require("../../utils/Validation/login");

router.post("/register", (req, res) => {
  console.log("++++++", req.body);

  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ message: `user with ${user.email} already exists` });
    } else {
      const newUser = new User({
        Username: req.body.Username,
        email: req.body.email,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              res
                .status(200)
                .json({ message: "user created successfully", user });
            })
            .catch((err) =>
              res.status(500).json({ message: "something went wrong" })
            );
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res
        .status(404)
        .json({ message: `user with ${email} does not exist` });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          Username: user.Username,
        };
        jwt.sign(
          payload,
          "secretors",
          {
            expiresIn: 31556926,
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(400).json({ message: "Incorrect password" });
      }
    });
  });
});

module.exports = router;
