const userServices = require('../services/userServices');
const bcrypt = require('bcrypt')

class UserController {

  async index(req, res){
    res.send({
      name: "venilson",
      email: "venilson2009@hotmail.com"
    });
  }

  async newUser(req, res){
    let {name, email, password, role} =  req.body;

    if (!name) res.status(400).json({err: "O nome está invalido"});
    if (!email) res.status(400).json({err: "O e-mail está invalido"});
    if (!password) res.status(400).json({err: "Senha invalida"});
    if (!role) role = 0;

    let emailExists =  await userServices.findEmail(email);

      if (emailExists) {
        res.status(406).json({error: 'Email já Cadastrado'})
        return;
      }

    try 
    {
      let hash = await bcrypt.hash(password, 10);
      const status = await userServices.Create(name, email, password = hash, role);
      res.status(200).send(status);
    } 

    catch (error) 
    {
      console.log(error);
    }
  }
}

module.exports = new UserController;