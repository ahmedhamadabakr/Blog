const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginSchema = require("../schema/login.schema");

const signup = async (req, res) => {
  try {
    // Validate request body
    if (!req.body.email || !req.body.password || !req.body.name) {
      res.status(400).send("Email, password, and name are required");
      return;
    }

    db.all(
      `SELECT * FROM users WHERE email=? LIMIT 1`,
      [req.body.email],
      async (err, users) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
          return;
        }

        if (users.length > 0) {
          res.status(400).send("Email is already taken");
          return;
        }

        const password = await bcrypt.hash(req.body.password, 10);
        db.run(
          `INSERT INTO users (email, password, name) VALUES (?, ?, ?)`,
          [req.body.email, password, req.body.name],
          (err) => {
            if (err) {
              console.log(err);
              res.status(500).send("Internal Server Error");
              return;
            }

            res.send("User is created");
          }
        );
      }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).send("Email and password are required");
      return;
    }
    loginSchema.parse(req.body);

    db.all(
      `SELECT * FROM users WHERE email=? LIMIT 1`,
      [req.body.email],
      async (err, users) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
          return;
        }

        if (users.length === 0) {
          res.status(404).send("User not found");
          return;
        }

        const isHash = await bcrypt.compare(
          req.body.password,
          users[0].password
        );

        if (!isHash) {
          res.status(400).send("Password or email is incorrect");
          return;
        }

        const token = jwt.sign({ email: users[0].email }, "1234");
        res.cookie("token", token);
        res.redirect("/dashboard");
      }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.send("Cookie is cleared");
};

module.exports = {
  login,
  logout,
  signup,
};