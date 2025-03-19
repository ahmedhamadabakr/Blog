const e = require("express");
const db = require("../db");

const postSchema = require("../schema/post.schema");

const createPost = (req, res) => {
  try {
    const { title, body } = req.body;
    const email = req.user.email;

    console.log(email);

    postSchema.parse(req.body);

    db.run(
      `INSERT INTO posts (title, body, author) VALUES (?, ?,?)`,
      [title, body, email],
      (err) => {
        if (err) {
          console.log(err);
          res.send("can not sent post");
          return;
        }
        res.json({
          title,
          body,
        });
      }
    );
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllPosts = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 3;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  try {
    db.all("SELECT * FROM `posts`", (err, post) => {
      if (err) {
        console.log(err);
      }

      const resultPosts = post.slice(startIndex, endIndex);

      const result = resultPosts.map((post) => {
        return {
          id: post.id,
          title: post.title,
        };
      });
      res.json(result);
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getPostById = (req, res) => {
  const postId = req.params.postId;

  try {
    db.all(`SELECT * FROM posts WHERE id=? LIMIT 1`, [postId], (err, posts) => {
      if (err) {
        if (err) {
          console.log(err);
          res.status(500).send(err.message);
          return;
        }
      }
      if (posts.length === 0) {
        res.status(404).send("no posts found");
        return;
      }

      res.json(posts);
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const updatePostById = (req, res) => {
  const postId = req.params.postId;
  const { title, body } = req.body;
  try {
    postSchema.parse(req.body);

    db.run(
      `UPDATE posts SET title=?, body=? WHERE id=?`,
      [title, body, postId],
      (err) => {
        console.log(err);
        return;
      }
    );
    res.send("updata sucessfull");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deletePostById = (req, res) => {
  try {
    const paylod = req.user;
    const postId = req.params.postId;
    const email = paylod.email;

    db.get("SELECT * FROM users WHERE id=?", [email], (err, user) => {
      if (err) {
        console.log(err);
        res.status(500).send("cant find user");
        return;
      }

      db.get("SELECT * FROM posts WHERE id=?", [postId], (err, post) => {
        if (err) {
          console.log(err);
          res.status(500).send("cant find user");
          return;
        }

        if (post.author === email || user.role === "admin") {
          db.run(`DELETE FROM posts WHERE id=?`, [postId], (err) => {
            if (err) {
              console.log(err);
              res.status(500).send("Something went wrong");
              return;
            }

            res.send("Post deleted");
          });
        } else {
          res.status(403).send("You are not allowed to delete this post");
          return;
        }
      });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updatePostForm = (req, res) => {
  res.send(`
        <form action="/api/posts/${req.params.postId}" method="POST">
        <label for="title">Name</label>
        <input type="text" id="title" name="title">
        <label for="body">Body</label>
        <input type="text" id="body" name="body">
        <button type="submit">Submit</button>
        </form>
    
        `);
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePostById,
  deletePostById,
  updatePostForm,
};
