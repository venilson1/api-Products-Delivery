const knex = require("../../database");

class CategoryService {
  async findAll() {
    try{
      const data = await knex('categories').select('*');
      return data;
    }catch(error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const data = await knex('categories').select('*').where('id', id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async insert(name) {
    try {
      let data = await knex('categories').insert({name});
      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(id, name) {
    try{
      const data = knex('categories').update({name}).where({id});
      return data;
    } catch(error){
      throw error;
    }
  }

  async delete(id) {
    try{
      const data = await knex('categories').del().where({id});
      return data;
    }catch(error){
      throw error;
    }
  }
}

module.exports = new CategoryService();
