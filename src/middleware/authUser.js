const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWTSecret = process.env.SECRET_JWT_USER;

const auth = (req, res, next) => {
  const authToken = req.headers["authorization"];

  if (authToken) {
    const bearer = authToken.split(" ");

    var token = bearer[1];

    jwt.verify(token, JWTSecret, { algorithm: ["RS256"] }, (err, data) => {
      if (err) return res.status(500).json({ auth: false, err: "token inválido" });

      if(data.role != 3) return res.status(401).json({ error: "unauthorized" });
      if(data.role != 1 && data.role != 2 && data.role != 2) return res.status(401).json({ error: "unauthorized" }); 
        
        req.token = token;
        req.data = data;
        next();
    });
  } else {
    res.status(401).json({ err: "token invalido" });
  }
};

module.exports = auth;