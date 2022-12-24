const productService = require("./productService");
const cloudinary = require("../../configs/cloudinary");

class ProductController {
  async findAll(req, res) {
    try{
      const data = await productService.findAll();
      return res.status(200).json(data);
    }catch (error){
      return res.status(500).json({error});
    }
  }

  async findById(req, res) {
    let id = req.params.id;

    try{
      const data = await productService.findById(id);

      if(!data.length) return res.status(404).json({ error: 'not found' });
  
      return res.status(200).json(data);
    } catch (error){
      return res.status(404).json({error});
    }
  }

  async insert(req, res) {
    let { path, filename } = req.file;
    let { name, description, price, promotion, discount, category_id } = req.body;

    if (!name) return res.status(400).send({ error: "O nome está invalido" });
    if (!description) return res.status(400).send({ error: "Descrição invalida está invalido" });
    if (!price) return res.status(400).send({ error: "Preço não fornecido" });
    if (!promotion) return res.status(400).send({ error: "Promoção não forncida" });
    if (!discount) return res.status(400).send({ error: "Desconto não fornecido" });
    if (!path) return res.status(400).send({ error: "Imagem não fornecido" });
    if (!category_id) return res.status(400).send({ error: "Categoria não fornecido" });

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
            url,
            category_id
          );
          
          if(error) return res.status(400).json(error);

          return res.status(200).json(data);
        }
      );
    } catch (error) {
      return res.status(500).json({error});
    }
  }

  async update(req, res) {
    let id = req.params.id;
    let { path, filename } = req.file;
    let { name, description, price, promotion, discount, category_id } = req.body;

    if (!name) return res.status(400).send({ error: "O nome está invalido" });
    if (!description) return res.status(400).send({ error: "Descrição invalida está invalido" });
    if (!price) return res.status(400).send({ error: "Preço não fornecido" });
    if (!promotion) return res.status(400).send({ error: "Promoção não forncida" });
    if (!discount) return res.status(400).send({ error: "Desconto não fornecido" });
    if (!path) return res.status(400).send({ error: "Imagem não fornecido" });
    if (!category_id) return res.status(400).send({ error: "Categoria não fornecido" });

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
              url,
              category_id
            );
            if(error) return res.status(400).json(error);
            return res.status(200).json(productUpdated);
          }
        );
      } catch (error) {
        return res.status(500).json(error);
      }
  }

  async delete(req, res) {
    let id = req.params.id;

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
