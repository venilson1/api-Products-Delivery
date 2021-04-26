class UserController {

  async index(){}

  async create(req, res){
    console.log(req.body);
    res.send("CREATE REQ BODY");
  }

}

module.exports = new UserController;