const bcrypt = require("bcrypt");
const User = require("../User/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWTSecret = process.env.SECRET_JWT_USER;

class AuthUserController {
  async login(req, res) {
    const { email, password } = req.body;

    if (email != undefined) {
      const userExists = await User.findOne({ email });

      if (userExists) {
        const validPassword = await bcrypt.compare(
          password,
          userExists.password
        );


        let payload = { id: userExists._id, name: userExists.name, role: userExists.role };

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

module.exports = new AuthUserController();
