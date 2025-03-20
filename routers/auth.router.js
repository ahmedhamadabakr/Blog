const express = require("express");
const { login, logout, signup } = require("../controllers/auth.controller");
const mustBeLoggedIn = require("../middlewares/must-be-logged");
const authRouter = express.Router();

const signupForm = (req, res) => {
  res.send(`
          <form action="/api/signup" method="POST">
          <label for="email">email</label>
          <input type="email" id="email" name="email">
          <label for="password">password</label>
          <input type="password" id="password" name="password">
          <label for="name">name</label>
          <input type="name" id="name" name="name">
          <button type="submit">Submit</button>
          </form>
      
          `);
};
authRouter.get("/api/signup", signupForm);
authRouter.post("/api/signup", signup);

authRouter.post("/api/login", login);

authRouter.get("/api/logout", mustBeLoggedIn, logout);

module.exports = authRouter;
