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

  async newProduct(req, res) {
    let { path, filename } = req.file;
    let { name, description, price, promotion, discount } = req.body;

    if (!name) {
      res.status(400).send({ err: "O nome está invalido" });
      return;
    }

    try {
      cloudinary.v2.uploader.upload(
        path,
        { public_id: filename, width: 400, height: 250, crop: "scale" },
        async (error, result) => {
          const { url } = result;
          const status = await productServices.create(
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
}
module.exports = new ProductController();
