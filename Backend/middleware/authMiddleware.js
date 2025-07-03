const jwt = require("jsonwebtoken");
const db = require("../db");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      db.query(
        "SELECT * FROM users WHERE id = ?",
        [decoded.id], // use id from token
        (err, results) => {
          if (err || results.length === 0) {
            res.status(401);
            throw new Error("Not authorised - user not found");
          }
          req.user = results[0]; // now req.user.id will be available
          next();
        }
      );
    } catch (error) {
      res.status(401);
      throw new Error("Not authorised - invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorised - no token");
  }
});

module.exports = { protect };
