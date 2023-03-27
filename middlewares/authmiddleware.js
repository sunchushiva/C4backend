const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      jwt.verify(token, "secret", async function (err, decoded) {
        if (decoded) {
          req.body.user = decoded.user;
          next();
        } else {
          res.status(400).send({ message: err });
        }
      });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  } else {
    res.status(400).send({ message: "Authorization required" });
  }
};

module.exports = authMiddleware;
