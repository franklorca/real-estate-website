// server/data/seeds/001_admin_user.js
exports.seed = async function(knex) {
  // Inserts the admin user. Assumes the table is already clean.
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