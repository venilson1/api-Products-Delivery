const UserService = require("../User/UserService");
const Client = require("../User/User");
const crypto = require("crypto");
const mailer = require("../../configs/mailer");
const bcrypt = require("bcrypt");

class ForgotPasswordController {
  
  async forgot(req, res) {
    const { email } = req.body;

    try {
      const user = await UserService.findEmail(email);

      if (!user) return res.status(400).json({ error: "usuário não encontrado" });

      const token = crypto.randomBytes(20).toString("HEX");

      //expiração do token
      const now = new Date();
      now.setHours(now.getHours() + 1);

      await UserService.updateForgotPassword(user[0].id, token, now);

      mailer.sendMail(
        {
          to: email,
          from: "dahsDelivery@hotmail.com",
          template: "forgotPassword",
          context: { token },
        },
        (err) => {
          if (err) {
            //prettier-ignore
            return res
              .status(400)
              .send({ error: "não foi possivel enviar esqueci minha senha" });
          } else {
            res.status(200).send();
          }
        }
      );
    } catch (error) {
      res.status(400).json({ err: "Usuário Não encontrado!" });
    }
  }

  async reset(req, res) {
    const { email, password, token } = req.body;

    try {

      const user = await UserService.findCredentials(email);

      if (!user) return res.status(400).json({ error: "usuario não encontrado" });

      if (token != user[0].password_reset_token) return res.status(400).json({ error: "token invalido" });
      
      if (new Date() > user[0].password_reset_expires) return res.status(400).json({ error: "token expirado" });

      let hash = await bcrypt.hash(password, 10);

      const data = await UserService.updatePassword(user[0].id, hash);

      res.status(200).json(data);
    } catch (error) {
      res
        .status(400)
        .send({ error: "não foi possivel resetar sua senha, tente novamente" });
    }
  }
}

module.exports = new ForgotPasswordController();
