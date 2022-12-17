const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWTSecret = process.env.SECRET_JWT_ADMIN;

const auth = (req, res, next) => {
  const authToken = req.headers["authorization"];

  if (authToken) {
    const bearer = authToken.split(" ");

    var token = bearer[1];

    jwt.verify(token, JWTSecret, { algorithm: ["RS256"] }, (err, data) => {
      if (err) return res.status(500).json({ auth: false, err: "token inválido" });

      if(data.role.indexOf("admin") == -1) return res.status(401).json({ error: "unauthorized" });
        
        req.token = token;
        console.log(data.role.indexOf("admin") == -1);
        req.loggedName = { name: data.name };
        next();
    });
  } else {
    res.status(401).json({ err: "token invalido" });
  }
};

module.exports = auth;
