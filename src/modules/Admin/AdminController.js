const adminService = require("./adminService");
const bcrypt = require("bcrypt");

class AdminController {

  async findAll(req, res) {
    try{
      const data = await adminService.findAll();
      return res.status(200).json(data);
    }catch (error){
      return res.status(500).json({error: 'internal server error'});
    }
  }

  async findById(req, res) {
    let id = req.params.id;

    try{
      const data = await adminService.findById(id);

      if(!data) return res.status(404).json({ error: 'not found' });
  
      return res.status(200).json(data);
    } catch (error){
      return res.status(404).json({error});
    }
  }

  async insert(req, res) {
    let { name, email, password, role_id } = req.body;

    if (!name) return res.status(400).send({ error: "name is invalid" });
    if (!email) return res.status(400).send({ error: "e-mail is invalid" });
    if (!password) return res.status(400).send({ error: "password is invalid" });
    // if (!role && role.indexOf("admin") == -1 || role.indexOf("employee") == -1 ) return res.status(400).send({ error: "role is invalid" });

    try {
      let hash = await bcrypt.hash(password, 10);
      const id = await adminService.insert(
        name,
        email,
        (password = hash),
        role_id
      );
      return res.status(200).json({id});
    } catch (error) {
      return res.send(error);
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const { name, email, role_id } = req.body;

    try{
      const data = await adminService.update(id, name, email, role_id);
      if(data) return res.status(200).json(data);
      return res.status(404).json({error: "not found"});
    }catch(error){
      return res.status(404).json({error});
    }
  }

  async delete(req, res) {
    let id = req.params.id;

    try{
      const data = await adminService.delete(id);
      if(data) return res.status(200).json();
      return res.status(404).json({error: "not found"});
    }catch(error){
      return res.status(500).json({error: 'internal server error'});
    }
  }
}

module.exports = new AdminController();
