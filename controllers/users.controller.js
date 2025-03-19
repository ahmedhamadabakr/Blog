const db = require("../db");
const getAllUsers = (req, res) => {
  try {
    db.all("SELECT * FROM users", (err, users) => {
      if (err) {
        console.log(err);
        return;
      }
      res.render("users.ejs", { users });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUseById = (req, res) => {
  try {
    db.all("SELECT id,email,name FROM users", (err, users) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json(users);
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllUsers,
  getUseById,
};
