const jwt = require("jsonwebtoken");
const Users = require("../db/models/").Users;
const bcrypt = require("bcrypt");

const JWT_SECRET = "secretpassword";

const createJWToken = user => {
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: 60 * 60 * 24
  });
};

const verifyJWTToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }
      resolve(decodedToken);
    });
  });

const verifyJWT_MW = (req, res, next) => {
  const token = req.cookies && req.cookies.token;
  if (token) {
    verifyJWTToken(token).then(user => {
      Users.findOne({ where: { login: user.login }, raw: true }).then(dbUser => {
        if (dbUser && user.password === dbUser.password) {
          next();
        } else {
          res.clearCookie("token");
          next();
        }
      });
    });
  } else {
    next();
  }
};

module.exports = {
  createJWToken,
  verifyJWTToken,
  verifyJWT_MW
};
