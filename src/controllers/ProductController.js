const productService = require("../services/productService");
const cloudinary = require("../modules/cloudinary");

class ProductController {
  async findAll(req, res) {
    try{
      const data = await productService.findAll();
      return res.status(200).json(data);
    }catch (error){
      return res.status(500).json({error: 'internal server error'});
    }
  }

  async findById(req, res) {
    let id = req.params.id;

    try{
      const data = await productService.findById(id);
      if(!data) return res.status(404).json({ error: 'not found' });
  
      return res.status(200).json(data);
    } catch (error){
      return res.status(404).json({error});
    }
  }

  async insert(req, res) {
    let { path, filename } = req.file;
    let { name, description, price, promotion, discount } = req.body;

    if (!name) return res.status(400).send({ err: "O nome está invalido" });

    if (!description) return res.status(400).send({ err: "Descrição invalida está invalido" });
    if (!price) return res.status(400).send({ err: "Preço não fornecido" });
    if (!promotion) return res.status(400).send({ err: "Promoção não forncida" });
    if (!discount) return res.status(400).send({ err: "Desconto não fornecido" });

    try {
      cloudinary.v2.uploader.upload(
        path,
        { public_id: filename, width: 400, height: 250, crop: "scale" },
        async (error, result) => {
          const { url } = result;
          const data = await productService.insert(
            name,
            description,
            price,
            promotion,
            discount,
            url
          );
          if(error) return res.status(400).json(error);
          return res.status(200).json(data);
        }
      );
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req, res) {
    let id = req.params.id;
    let { path, filename } = req.file;
    let { name, description, price, promotion, discount } = req.body;

    if (id.match(/^[0-9a-fA-F]{24}$/) == null) return res.status(404).json({error: 'Id is not valid'});

      try {
        cloudinary.v2.uploader.upload(
          path,
          { public_id: filename, width: 400, height: 250, crop: "scale" },
          async (error, result) => {
            const { url } = result;

            const productUpdated = await productService.update(
              id,
              name,
              description,
              price,
              promotion,
              discount,
              url
            );
            if(error) return res.status(400).json(error);
            return res.status(200).send(productUpdated);
          }
        );
      } catch (error) {
        return res.status(500).json(error);
      }
  }

  async delete(req, res) {
    let id = req.params.id;

    if (id.match(/^[0-9a-fA-F]{24}$/) == null) return res.status(404).json({error: 'Id is not valid'});

    try{
      const data = await productService.delete(id);
      if(data) return res.status(200).json();
      return res.status(404).json({error: "not found"});
    }catch(error){
      return res.status(500).json({error: 'internal server error'});
    }
  }
}

module.exports = new ProductController();
