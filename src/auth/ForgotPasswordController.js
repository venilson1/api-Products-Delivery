const clientServices = require("../services/UserService");
const Client = require("../models/User");
const crypto = require("crypto");
const mailer = require("../configs/mailer");
const bcrypt = require("bcrypt");

class ForgotPasswordController {
  async forgot(req, res) {
    const { email } = req.body;

    try {
      const client = await clientServices.findEmail(email);

      if (!client) {
        return res.status(400).json({ error: "cliente não encontrado" });
      }

      const token = crypto.randomBytes(20).toString("HEX");

      //expiração do  token
      const now = new Date();
      now.setHours(now.getHours() + 1);

      await Client.findByIdAndUpdate(client.id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: now,
        },
      });

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
      res.status(400).json({ err: "erro ao resetar a senha, tente novamente" });
    }
  }

  async reset(req, res) {
    const { email, password, token } = req.body;

    try {
      const client = await Client.findOne({ email }).select(
        "+passwordResetToken passwordResetExpires"
      );

      if (!client) {
        return res.status(400).json({ error: "cliente não encontrado" });
      }

      if (token !== client.passwordResetToken) {
        return res.status(400).json({ error: "token invalido" });
      }

      const now = new Date();

      if (now > client.passwordResetExpires) {
        return res.status(400).json({ error: "token expirado" });
      }

      let hash = await bcrypt.hash(password, 10);
      client.password = hash;

      await client.save();

      res.status(200).send(client);
    } catch (error) {
      res
        .status(400)
        .send({ error: "não foi possivel resetar sua senha, tente novamente" });
    }
  }
}

module.exports = new ForgotPasswordController();
