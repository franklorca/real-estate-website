// server/data/mockDb.js

// The password hash was generated from "admin123"
const users = [
  {
    id: 1,
    email: 'donugob1@gmail.com',
    password_hash: '$2a$12$mkVl2e3awLPCS8mdc2UH9OwBcfKKPiFr25jF3u.JAYNShf8QLYEay', 
    role: 'admin'
  }
];

// Function to add a new user to our in-memory array
const addUser = (newUser) => {
  // In a real DB, the ID would be auto-incrementing. Here we simulate it.
  newUser.id = users.length + 1;
  users.push(newUser);
  return newUser;
};

module.exports = { users, addUser };