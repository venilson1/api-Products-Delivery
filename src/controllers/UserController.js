class UserController {

  async index(req, res){
    res.send({
      name: "venilson",
      email: "venilson2009@hotmail.com"
    });
  }

  async create(req, res){
    console.log(req.body);

    const {name, email, password} =  req.body;

    if (!name) res.status(400).send({err: "O nome está invalido"});
    if (!email) res.status(400).send({err: "O e-mail está invalido"});
    if (!password) res.status(400).send({err: "Senha invalida"});

    res.status(200).send(req.body);
  }
}

module.exports = new UserController;