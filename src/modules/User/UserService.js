const knex = require("../../database");

class UserService {

  async findAll() {
    try{
      const data = await knex
      .select('id', 'first_name','last_name', 'address', 'complement', 'reference_point', 'email', 'cpf', 'cell_phone', 'created_at')
      .from('users').where('deleted_at', null);
      return data;
    }catch(error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const data = await knex('users')
      .select('id', 'first_name','last_name', 'address', 'complement', 'reference_point', 'email', 'cpf', 'cell_phone', 'created_at')
      .where('id', id).where('deleted_at', null);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async insert(    
    first_name,
    last_name,
    address,
    complement,
    reference_point,
    cpf,
    email,
    password,
    cell_phone,
    role_id
    ) {

    try{
      let user = await knex('users').insert(
        { 
          first_name,
          last_name,
          address,
          complement,
          reference_point,
          cpf,
          email,
          password,
          cell_phone,
          role_id
        });
      return user;
    } catch (e){
      throw e;
    }
  }

  async findEmail(email) {
    const emailExists = await knex.select('*').from('users').where({email});
    return emailExists;
  }

  async update(
    id,
    first_name, 
    last_name,
    address,
    complement,
    reference_point,
    cpf,
    email,
    password,
    cell_phone,
  ) {

    try{
      const data = await knex('users').update({
        first_name, 
        last_name,
        address,
        complement,
        reference_point,
        cpf,
        email,
        password,
        cell_phone,
      }).where({id});
      return data;
    } catch(error){
      throw error;
    }
  }

  async delete(id) {
    try{
      const data = await knex('users').where({id}).update('deleted_at', new Date());
      return data;
    }catch(error){
      throw error;
    }
  }

  async findMe(id){
    try{
      const data = await knex('users')
      .select('id', 'first_name','last_name', 'address', 'complement', 'reference_point', 'email', 'cpf', 'cell_phone', 'created_at')
      .where('id', id).where('deleted_at', null);
      return data;
    }catch(error){
      throw error;
    }
  }
}

module.exports = new UserService();
