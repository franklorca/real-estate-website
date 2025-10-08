// inside server/data/seeds/002_properties.js
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('properties').del();
  await knex('properties').insert([
    {
    id: 1,
    title: 'Oceanfront Paradises',
    city: 'Malibu, CA',
    price: 12500000,
    bedrooms: 5,
    bathrooms: 7,
    image: 'https://images.unsplash.com/photo-1597285112431-115a1f48bde2?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'Skyline Penthouse',
    city: 'New York, NY',
    price: 8900000,
    bedrooms: 4,
    bathrooms: 5,
    image: 'https://images.unsplash.com/photo-1674494777503-f5d3484104c9?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: 'Modern Mountain Retreat',
    city: 'Aspen, CO',
    price: 6200000,
    bedrooms: 6,
    bathrooms: 6,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  ]);
};