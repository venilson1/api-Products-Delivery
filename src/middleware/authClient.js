const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWTSecret = process.env.SECRET_JWT_CLIENT;

const auth = (req, res, next) => {
  const authToken = req.headers["authorization"];

  if (authToken) {
    const bearer = authToken.split(" ");

    var token = bearer[1];

    jwt.verify(token, JWTSecret, { algorithm: ["RS256"] }, (err, data) => {
      if (err) {
        res.status(500).json({ auth: false, err: "token inválido" });
      } else {
        req.token = token;
        console.log(data);
        req.loggedName = { name: data.name };
        req.clientId = { name: data.id };
        next();
      }
    });
  } else {
    res.status(401).json({ err: "token invalido" });
  }
};

module.exports = auth;
