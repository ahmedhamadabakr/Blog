const db = require("../db");
const jwt = require("jsonwebtoken");
const loginSchema = require("../schema/login.schema");

const login = (req, res) => {
  try {
    loginSchema.parse(req.body);

    db.all(
      `SELECT * FROM users WHERE email=? AND password=? LIMIT 1`,
      [req.body.email, req.body.password],
      (err, users) => {
        if (err) {
          console.log(err);
          return;
        }

        if (users.length === 0) {
          res.send("users not found");
        }
        const token = jwt.sign({ email: users[0].email }, "1234");
        res.cookie("token", token);
        res.redirect("/dashboard");
      }
    );
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.send("cookie is clear")
};

module.exports = {
  login,
  logout,
};
