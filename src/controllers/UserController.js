class UserController {

  async index(req, res){
    res.send({
      name: "Venilson",
      email: "venilson2009@hotmail.com"
    });
  }

  async create(req, res){
    console.log(req.body);
    res.send(req.body);
  }
}

module.exports = new UserController;