const express = require("express");
const usersRouter = express.Router();

const { getAllUsers, getUseById } = require("../controllers/users.controller");

usersRouter.get("/users", getAllUsers);
usersRouter.get("/api/users", getUseById);


module.exports = usersRouter;
