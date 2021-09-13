const productServices = require("../services/productServices");
const cloudinary = require("../utils/cloudinary");

class ProductController {
  async index(req, res) {
    const products = await productServices.findProducts();

    res.send({
      welcome: req.loggedEmail,
      products,
    });
  }

  async getProductById(req, res) {
    let id = req.params.id;
    const productById = await productServices.findProductId(id);

    if (productById) {
      res.status(200).json({ productById });
    } else {
      res.status(404).json({});
    }
  }

  async newProduct(req, res) {
    let { path, filename } = req.file;
    let { name, description, price, promotion, discount } = req.body;

    if (!name) {
      res.status(400).send({ err: "O nome está invalido" });
      return;
    }

    if (!description) {
      res.status(400).send({ err: "Descrição invalida está invalido" });
      return;
    }
    if (!price) {
      res.status(400).send({ err: "Preço não fornecido" });
      return;
    }
    if (!promotion) {
      res.status(400).send({ err: "Promoção não forncida" });
      return;
    }

    if (!discount) {
      res.status(400).send({ err: "Desconto não fornecido" });
      return;
    }

    try {
      cloudinary.v2.uploader.upload(
        path,
        { public_id: filename, width: 400, height: 250, crop: "scale" },
        async (error, result) => {
          const { url } = result;
          const status = await productServices.register(
            name,
            description,
            price,
            promotion,
            discount,
            url
          );
          res.status(200).send(status);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async edit(req, res) {
    let { path, filename } = req.file;
    let id = req.params.id;
    let { name, description, price, promotion, discount } = req.body;

    const productById = await productServices.findProductId(id);

    if (productById) {
      try {
        cloudinary.v2.uploader.upload(
          path,
          { public_id: filename, width: 400, height: 250, crop: "scale" },
          async (error, result) => {
            const { url } = result;

            const productUpdated = await productServices.update(
              id,
              name,
              description,
              price,
              promotion,
              discount,
              url
            );
            res.status(200).send(productUpdated);
          }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      res.status(404).json({});
    }
  }

  async remove(req, res) {
    let id = req.params.id;

    const productById = await productServices.findProductId(id);

    if (productById) {
      const productById = await productServices.delete(id);
      res.status(200).json({ productById });
    } else {
      res.status(404).json({});
    }
  }
}

module.exports = new ProductController();
