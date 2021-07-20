const authServices = require('../services/authServices');
const bcrypt = require('bcrypt');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');


const JWTSecret = "oratoroeuaroupadoreideroma"

class AuthController {

  async login(req, res) {

    const {id, email, password} = req.body;

    if(email != undefined){

      const emailExists = await User.findOne({ email })

      if(emailExists){
        const validPassword = await bcrypt.compare(password, emailExists.password);

        if(password != undefined){

          if(validPassword){

            jwt.sign(
              {id: id, email: email}, 
              JWTSecret, 
              {expiresIn: '48h'}, (err, token) => {
                if(err){
                  res.status(400).json({err: 'falha interna'})
                } else{
                  res.status(200).json({token: token})
                }
            })
          } else{
            res.status(400).json({err: "Credenciais invalidas"})
          }
          
        } else{
          res.status(401).json({err: "Senha invalida"})
        }

      } else{
        res.status(404).json({err: "usuário não encontrado"})
      }

    } else{
      res.status(400).json({err: "E-mail invalido"})
    }

  }

}

module.exports = new AuthController;