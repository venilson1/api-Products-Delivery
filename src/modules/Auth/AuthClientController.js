const bcrypt = require("bcrypt");
const Client = require("../User/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWTSecret = process.env.SECRET_JWT_CLIENT;

class AuthClientController {
  async login(req, res) {
    const { email, password } = req.body;

    if (email != undefined) {
      const clientExists = await Client.findOne({ email });

      if (clientExists) {
        const validPassword = await bcrypt.compare(
          password,
          clientExists.password
        );

        let payload = { id: clientExists._id, name: clientExists.name };

        if (password !== undefined) {
          if (validPassword) {
            jwt.sign(payload, JWTSecret, { expiresIn: "48h" }, (err, token) => {
              if (err) {
                res.status(400).json({ err: "falha interna" });
              } else {
                return res.status(200).send({ auth: true, token: token });
              }
            });
          } else {
            res.status(400).json({ err: "Credenciais invalidas" });
          }
        } else {
          res.status(401).json({ err: "Senha invalida" });
        }
      } else {
        res.status(404).json({ err: "usuário não encontrado" });
      }
    } else {
      res.status(400).json({ err: "nome invalido" });
    }
  }
}

module.exports = new AuthClientController();
