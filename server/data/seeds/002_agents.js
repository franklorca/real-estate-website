exports.seed = async function (knex) {
  await knex("agents").insert([
    {
      name: "John Doe",
      email: "donugob1@gmail.com",
      phone: "(555) 123-4567",
      bio: "Specializing in luxury coastal properties for over 15 years.",
      profile_picture_url:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    },
  ]);
};
