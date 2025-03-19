const express = require("express");
const dashboardRouter = express.Router();

const mustBeLoggedIn = require("../middlewares/must-be-logged");

dashboardRouter.get("/dashboard", mustBeLoggedIn, (req, res) => {
  res.send("Welcome to dashboard");
});

module.exports = dashboardRouter;

