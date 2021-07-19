const authServices = require('../services/authServices');
const bcrypt = require('bcrypt');
const User = require('../models/Users');

class AuthController {

  async login(req, res) {

    const {email, password} = req.body;

    if(email != undefined){

      const emailExists = await User.findOne({ email })

      if(emailExists){
        const validPassword = await bcrypt.compare(password, emailExists.password);

        if(password != undefined){

          if(validPassword){
            res.status(200).json({token: "TOKEN FALSO"})
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

    // const allUsers =  await authServices.auth(email, password)
    // console.log(allUsers)

  }

}

module.exports = new AuthController;