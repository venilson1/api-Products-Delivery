const jwt = require('jsonwebtoken');
require('dotenv').config()

const JWTSecret = process.env.SECRET_JWT

const auth = (req, res, next) => {
  const authToken = req.headers['authorization'];

  if (authToken) {
    
    const bearer = authToken.split(' ');

    var token = bearer[1];

    jwt.verify(token,JWTSecret, (err, data) => {
      if(err){
        res.status(401).json({err: 'token inválido'})
      } else {
        console.log(data)
        req.token = token;
        req.loggedEmail = { email: data.email}
        next();
      }
    })


  } else {
    res.status(401).json({err:'token invalido'})
  }
  
}

module.exports = auth;