const userServices = require('../services/userServices');
const bcrypt = require('bcrypt');

class UserController {

  async getAllUsers(req, res){

    const allUsers =  await userServices.findAllUsers()

    res.send({
      allUsers
    });
  }

  async getUserById(req, res){
    let id =  req.params.id;
    const usersById = await userServices.findUserId(id)
    
    if (usersById == undefined) {
      res.status(404).json({})
    } else{
      res.status(200).json({ usersById })
    }
  }

  async newUser(req, res){
    let {name, email, password, role} = req.body;

    if (!name) {
      res.status(400).send({err: "O nome está invalido"});
      return;
    }
    if (!email) {
      res.status(400).send({err: "O e-mail está invalido"});
      return;
    }
    if (!password) {
      res.status(400).send({err: "Senha invalida"});
      return;
    }
    if (!role || role > 3) {
      res.status(400).send({err: "Função está invalida"});
      return;
    }

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

  async edit(req, res){

    let id = req.params.id; 
    let {name, email, role } = req.body;

    var result = await userServices.update(id, name, email, role)

    if(result != undefined){
      if (result.status) {
        res.status(200).send(result.status)
      } else{
        res.status(406).send(result.error)
      }
    } else{
      res.status(406).send('Erro no servidor')
    }
  }

  async remove(req, res){
    let id = req.params.id;

    var result = await userServices.delete(id);

    if (result.status) {
      res.status(200).send(result.status)
    } else{
      res.status(406).send(result.error)
    }
  }
}

module.exports = new UserController;