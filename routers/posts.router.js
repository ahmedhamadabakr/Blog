const express = require("express");
const postsRouter = express.Router();

const mustBeLoggedIn = require("../middlewares/must-be-logged");
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePostById,
  deletePostById,
  updatePostForm,
} = require("../controllers/posts.controller");
const isAdmin = require("../middlewares/is-admin");

postsRouter.get("/api/posts", getAllPosts);

postsRouter.get("/api/posts/:postId", getPostById);

//CREATE
postsRouter.post("/api/posts", mustBeLoggedIn, createPost);

//UPDATE
postsRouter.post("/api/posts/:postId", mustBeLoggedIn, isAdmin, updatePostById);

postsRouter.get("/api/posts/:postId/delete", mustBeLoggedIn, deletePostById);

postsRouter.get("/updata-posts/:postId", updatePostForm);

module.exports = postsRouter;
