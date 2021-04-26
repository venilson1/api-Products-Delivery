const User = require('../models/Users');

class HomeController {

  async index(req, res) {
    res.send("APP EXPRESS!");
  }

}

module.exports = new HomeController();