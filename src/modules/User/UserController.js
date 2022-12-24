const userService = require("./UserService");
const bcrypt = require("bcrypt");

class UserController {

  async findAll(req, res) {
    try{
      const data = await userService.findAll();
      return res.status(200).json(data);
    }catch (error){
      return res.status(500).json({error: error});
    }    
  }

  async findById(req, res) {
    let id = req.params.id;

    try{
      const data = await userService.findById(id);

      if(!data) return res.status(404).json({ error: 'not found' });
  
      return res.status(200).json(data);
    } catch (error){
      return res.status(404).json({error});
    }
  }

  async insert(req, res) {
    let { first_name, last_name, address, complement, reference_point, cpf, email, password, cell_phone } = req.body;


    if (!first_name) return res.status(400).send({ err: "first name is invalid" });
    if (!last_name) return res.status(400).send({ err: "last name is invalid" });
    if (!address) return res.status(400).send({ err: "adress is invalid" });
    if (!complement) return res.status(400).send({ err: "complement place is invalid" });
    if (!reference_point) return res.status(400).send({ err: "reference point is invalid" });
    if (!cpf) return res.status(400).send({ err: "cpf is invalid" });
    if (!email) return res.status(400).send({ err: "email is invalid" });
    if (!password) return res.status(400).send({ err: "password is invalid" });
    if (!cell_phone) return res.status(400).send({ err: "telephone is invalid" });


    try {
      let hash = await bcrypt.hash(password, 10);

      const role_id = 3;

      const data = await userService.insert(
        first_name, 
        last_name,
        address,
        complement,
        reference_point,
        cpf,
        email,
        (password = hash),
        cell_phone,
        role_id
      );
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req, res) {
    const id = req.params.id;
    let { first_name, last_name, address, complement, reference_point, cpf, email, password, cell_phone } = req.body;

    if (!first_name) return res.status(400).send({ err: "first name is invalid" });
    if (!last_name) return res.status(400).send({ err: "last name is invalid" });
    if (!address) return res.status(400).send({ err: "adress is invalid" });
    if (!complement) return res.status(400).send({ err: "complement place is invalid" });
    if (!reference_point) return res.status(400).send({ err: "reference point is invalid" });
    if (!cpf) return res.status(400).send({ err: "cpf is invalid" });
    if (!email) return res.status(400).send({ err: "email is invalid" });
    if (!password) return res.status(400).send({ err: "password is invalid" });
    if (!cell_phone) return res.status(400).send({ err: "telephone is invalid" });


    try{
      let hash = await bcrypt.hash(password, 10);

      const data = await userService.update(
        id,
        first_name, 
        last_name,
        address,
        complement,
        reference_point,
        cpf,
        email,
        (password = hash),
        cell_phone,
      );

      if(data) return res.status(200).json(data);
      return res.status(404).json({error: "not found"});
    }catch(error){
      return res.status(404).json({error});
    }

  }

  async delete(req, res) {
    let id = req.params.id;

    try{
      const data = await userService.delete(id);
      if(data) return res.status(200).json();
      return res.status(404).json({error: "not found"});
    }catch(error){
      return res.status(500).json(error);
    }
  }

  async me(req, res){
    const id = req.data.id;
    try{
      const data = await userService.findMe(id);
      return res.status(200).json(data);
    }catch (error){
      return res.status(500).json({error: error});
    }   
  }
}

module.exports = new UserController();
