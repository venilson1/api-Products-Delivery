const User = require('../models/Users');

class authServices {

  async auth(email, password) {

    // if(email != undefined){

    //   const emailExists = await User.findOne({ email })

    //   if(emailExists){

    //     const passwordExists = await User.findOne({ password })
        
    //     if(password != undefined){

    //       if(passwordExists == password){
    //         res.status(200).json({token: "TOKEN FALSO"})
    //       } else{
    //         res.status(401).json({err: "Credenciais invalidas"})
    //       }
          
    //     } else{
    //       res.status(401).json({err: "Credenciais invalidas"})
    //     }


    //   } else{
    //     res.status(404).json({err: "email não existe na base de dados"})
    //   }

    // } else{
    //   res.status(400).json({err: "E-mail invalido"})
    // }

  }
}

module.exports = new authServices();