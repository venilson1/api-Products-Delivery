const knex = require("../../database");

class AdminServices {

  async findAll() {
    try{
      const data = await knex
      .select('admins.id', 'admins.name', 'email', 'roles.name as role', 'admins.created_at')
      .from('admins')
      .join('roles', 'admins.role_id', '=', 'roles.id');
      return data;
    }catch(error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const data = await knex.select('admins.id', 'admins.name', 'email', 'roles.name as role', 'admins.created_at')
      .from('admins')
      .join('roles', 'admins.role_id', '=', 'roles.id').where('admins.id', id);

      return data;
    } catch (error) {
      throw error;
    }
  }

  async insert(name, email, password, role_id) {
    try{
      const data = await knex('admins').insert({ name, email, password, role_id });
      return data;
    } catch (e){
      throw e;
    }
  }

  async findEmail(email) {
    const emailExists = await knex.select('*').from('admins').where('email', email);
    return emailExists;
  }

  async update(id, name, email, role_id) {

    try{
      const data = await knex('admins').update({id, name, email, role_id}).where({id});
      return data;
    } catch(error){
      throw error;
    }
  }

  async delete(id) {
    try{
      const data = await knex('admins').del().where({id});
      return data;
    }catch(error){
      throw error;
    }
  }
}

module.exports = new AdminServices();
