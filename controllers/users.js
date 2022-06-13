//DEPENDENCIES
const { hashSync } = require("bcrypt");
const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../models/users");

//config
const users = express.Router();
const saltRounds = bcrypt.genSaltSync(10);

//NEW USER
users.get("/new", (req, res) => {
  res.render("users/new.ejs");
});

//? Seed  Routes
users.get("/seed", async (req, res) => {
  try {
    await User.deleteMany({});
    const newUser = await User.create([
      {
        username: "potatoe",
        password: bcrypt.hashSync("1234", saltRounds),
      },
    ]);
    res.send(newUser);
  } catch (error) {
    res.send(error);
  }
});

//Show user
users.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user === null) {
    res.send("Login fail");
  } else {
    //compares if both passwords are the same
    if (bcrypt.compareSync(password, user.password)) {
      //create the session(AAA) and set user key & value
      //also set the cookie (middleware) - (AAA)
      req.session.user = user;
      //console log session
      res.send(user);
    } else {
      res.send("password fail");
    }
  }
});

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  } else {
    res.send("Login fail");
  }
};

//cookie - AAA -> middleware detects cookies when requesting session matches.
users.get("/secret", async (req, res) => {
  if (req.session.user) {
    res.send("bobby tan");
  } else {
    res.send("cannot");
  }
});

//CREATE USER ROUTE
users.post("/new", async (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  try {
    const createdUser = await User.create(req.body);
    console.log("Created user is: ", createdUser);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

//cookie -AAA -> middleware -> req.session
users.get("/secret", isAuthenticated, async (req, res) => {
  res.send(req.session.user);
});

module.exports = users;
