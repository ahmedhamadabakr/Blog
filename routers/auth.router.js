const express = require("express");
const { login, logout } = require("../controllers/auth.controller");
const mustBeLoggedIn = require("../middlewares/must-be-logged");
const authRouter = express.Router();

authRouter.post("/api/login", login);

authRouter.get("/api/logout",mustBeLoggedIn , logout);

module.exports = authRouter;
