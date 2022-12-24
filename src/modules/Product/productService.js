const knex = require("../../database");

class ProductService {

  async findAll() {
    try{
      const data = await knex('products').select('*');
      return data;
    }catch(error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const data = await knex('products').select('*').where('id', id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async insert(name, description, price, promotion, discount, path, category_id) {
    
    try{
      const product = await knex('products').insert({
        name,
        description,
        price,
        promotion,
        discount,
        path,
        category_id
      });
      return product;
    } catch (error){
      throw error;
    }
  }

  async update(id, name, description, price, promotion, discount, path, category_id) {

    try{
      const data = knex('products').update({
        name,
        description,
        price,
        promotion,
        discount,
        path,
        category_id
      }).where({id});
      return data;
    }catch(error){
      throw error;
    }
  }

  async delete(id) {
    try{
      const data = await knex('products').del().where({id});
      return data;
    }catch(error){
      throw error;
    }
  }

  async findTotal(products) {

    const ids = [];
    products.forEach(el => ids.push(el.id));

    try{
      const data = await knex('products').select('id', 'price').whereIn('id', ids);

      let total = 0;
      data.forEach(el => {
        products.forEach(pro => {
          if(el.id == pro.id){
            total += parseFloat(el.price) * pro.quantity
          }
        })
      });

      return parseFloat(total.toFixed(2));
    }catch(error) {
      throw error;
    }
  }
}


module.exports = new ProductService();
