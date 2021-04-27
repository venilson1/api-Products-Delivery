const userServices = require('../services/userServices');

class UserController {

  async index(req, res){
    res.send({
      name: "venilson",
      email: "venilson2009@hotmail.com"
    });
  }

  async create(req, res){
    const {name, email, password} =  req.body;

    if (!name) res.status(400).json({err: "O nome está invalido"});
    if (!email) res.status(400).json({err: "O e-mail está invalido"});
    if (!password) res.status(400).json({err: "Senha invalida"});

    const status = await userServices.Create(name, email, password);


    res.status(200).send(status);
  }
}

module.exports = new UserController;