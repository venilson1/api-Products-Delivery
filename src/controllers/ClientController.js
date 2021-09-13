const clientServices = require("../services/clientServices");
const bcrypt = require("bcrypt");

class ClientController {
  async index(req, res) {
    const allClient = await clientServices.findClients();

    res.send({
      welcome: req.loggedEmail,
      allClient,
    });
  }

  async getClientById(req, res) {
    let id = req.params.id;
    const clientById = await clientServices.findClientId(id);

    if (clientById) {
      res.status(200).json({ clientById });
    } else {
      res.status(404).json({});
    }
  }

  async newClient(req, res) {
    let { name, address, complement, reference, email, password, telephone } =
      req.body;

    if (!name) {
      res.status(400).send({ err: "Nome invalido" });
      return;
    }

    if (!address) {
      res.status(400).send({ err: "Endereço invalido" });
      return;
    }

    if (!complement) {
      res.status(400).send({ err: "Complemento invalido" });
      return;
    }

    if (!reference) {
      res.status(400).send({ err: "Local de referência invalida" });
      return;
    }

    if (!email) {
      res.status(400).send({ err: "E-mail invalido" });
      return;
    }

    if (!password) {
      res.status(400).send({ err: "Senha invalida" });
      return;
    }

    if (!telephone) {
      res.status(400).send({ err: "Telefone invalido" });
      return;
    }

    let emailExists = await clientServices.findEmail(email);

    if (emailExists) {
      res.status(406).json({ error: "Email já Cadastrado" });
      return;
    }

    try {
      let hash = await bcrypt.hash(password, 10);
      const status = await clientServices.register(
        name,
        address,
        complement,
        reference,
        email,
        (password = hash),
        telephone
      );
      res.status(200).send(status);
    } catch (error) {
      console.log(error);
    }
  }

  async edit(req, res) {
    let id = req.params.id;
    let { name, address, complement, reference, email, telephone } = req.body;

    const clientById = await clientServices.findClientId(id);

    if (clientById) {
      var result = await clientServices.update(
        id,
        name,
        address,
        complement,
        reference,
        email,
        telephone
      );
      res.status(200).send(result.status);
    } else {
      res.status(404).json({});
    }
  }
}

module.exports = new ClientController();
