const bcrypt = require("bcrypt");
const Admin = require("../Admin/Admin");
const jwt = require("jsonwebtoken");
const knex = require("../../database/index");
require("dotenv").config();

const JWTSecret = process.env.SECRET_JWT_ADMIN;

class AuthAdminController {
  async login(req, res) {
    const { email, password } = req.body;

    if (email != undefined) {
      const userExists = await knex.select('*').from('admins').where('email', email);

      if (userExists.length > 0) {
        const validPassword = await bcrypt.compare(
          password,
          userExists[0].password
        );

        let payload = { id: userExists[0].id, name: userExists[0].name, role: userExists[0].role_id };

        if (password !== undefined) {
          if (validPassword) {
            jwt.sign(payload, JWTSecret, { expiresIn: "48h" }, (err, token) => {
              if (err) {
                res.status(400).json({ err: "falha interna" });
              } else {
                return res.status(200).send({ auth: true, token: token, expiresIn: '48h' });
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

module.exports = new AuthAdminController();
