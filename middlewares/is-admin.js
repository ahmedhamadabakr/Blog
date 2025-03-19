const db = require("../db");

function isAdmin(req, res, next) {
  const email = req.user.email;
  db.get("SELECT * FROM users WHERE email=?", [email], (error, user) => {
    if (err) {
      console.log("error ", error);
      res.status(500).send("something went wrong!");
      return;
    }

    if (user.role === "admin") {
      next();
    } else {
      res.status(403).send("You are not admin");
    }
  });
}

module.exports = isAdmin;
