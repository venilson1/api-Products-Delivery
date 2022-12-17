const adminServices = require("../services/adminServices");
const bcrypt = require("bcrypt");

class AdminController {

  async findAll(req, res) {
    try{
      const data = await adminServices.findAll();
      return res.status(200).json(data);
    }catch (error){
      return res.status(500).json({error: 'internal server error'});
    }
  }

  async findById(req, res) {
    let id = req.params.id;

    try{
      const data = await adminServices.findById(id);

      if(!data) return res.status(404).json({ error: 'not found' });
  
      return res.status(200).json(data);
    } catch (error){
      return res.status(404).json({error});
    }
  }

  async insert(req, res) {
    let { name, email, password, role } = req.body;

    if (!name) return res.status(400).send({ error: "name is invalid" });
    if (!email) return res.status(400).send({ error: "e-mail is invalid" });
    if (!password) return res.status(400).send({ error: "password is invalid" });
    if (!role && role.indexOf("admin") == -1 || role.indexOf("employee") == -1 ) return res.status(400).send({ error: "role is invalid" });

    let emailExists = await adminServices.findEmail(email);
    if (emailExists) return res.status(406).json({ error: "e-mail already registered" });

    try {
      let hash = await bcrypt.hash(password, 10);
      const data = await adminServices.insert(
        name,
        email,
        (password = hash),
        role
      );
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const { name, email, role } = req.body;

    if (id.match(/^[0-9a-fA-F]{24}$/) == null) return res.status(404).json({error: 'Id is not valid'});

    try{
      const data = await adminServices.update(id, name, email, role);
      if(data) return res.status(200).json();
      return res.status(404).json({error: "not found"});
    }catch(error){
      return res.status(404).json({error});
    }
  }

  async delete(req, res) {
    let id = req.params.id;

    if (id.match(/^[0-9a-fA-F]{24}$/) == null) return res.status(404).json({error: 'Id is not valid'});

    try{
      const data = await adminServices.delete(id);
      if(data) return res.status(200).json();
      return res.status(404).json({error: "not found"});
    }catch(error){
      return res.status(500).json({error: 'internal server error'});
    }
  }
}

module.exports = new AdminController();
