const jwt = require("jsonwebtoken");

function mustBeLoggedIn(req, res, next) {
  if (!req.cookies.token) {
    res.status(401).send("you are not login");
    return;
  }

  try {
    const paylod = jwt.verify(req.cookies.token, "1234");
    
    req.user = paylod;

    next();
  } catch (error) {
    res.status(401).send("Unauthorized");
    return;
  }
}

module.exports = mustBeLoggedIn;
