exports.seed = async function(knex) {
  await knex('users').truncate();
  
  await knex('users').insert([
    {
      id: 1, 
      name: 'Admin',
      email: 'donugob1@gmail.com',
      password_hash: '$2a$12$2qDmIPr9BOO9AF5L6.bNEe4nMkD2E6VPb3UE1msQOO5HrGFhZpgOu',
      role: 'admin'
    }
  ]);
};