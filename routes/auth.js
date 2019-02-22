const express = require("express");
const router = express.Router();

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

module.exports = router;

// User model
const User           = require("../models/user");

// BCrypt to encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const salt     = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  User.create({
    username,
    password: hashPass
  })
  .then(() => {
    if (username === "" || password === "") {
      res.render("auth/signup", {
        errorMessage: "Indicate a username and a password to sign up"
      });
      return;
    }
    res.redirect("/");
  })
  .catch(error => {
    console.log(error);
  })
User.findOne({ "username": username })
.then(user => {
  if (user !== null) {
      res.render("auth/signup", {
        errorMessage: "The username already exists!"
      });
      return;
    }

    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    User.create({
      username,
      password: hashPass
    })
    .then(() => {
      res.redirect("/");
    })
    .catch(error => {
      console.log(error);
    })
})
.catch(error => {
  next(error);
})
});