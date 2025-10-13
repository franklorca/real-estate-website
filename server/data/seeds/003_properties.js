// server/data/seeds/002_properties.js
exports.seed = async function (knex) {
  // The cleanup seed has already cleared the table. We just insert.
  await knex("properties").insert([
    {
      title: "Oceanfront Paradise",
      city: "Malibu, CA",
      price: 12500000.0,
      bedrooms: 5,
      bathrooms: 7,
      image:
        "https://images.unsplash.com/photo-1597285112431-115a1f48bde2?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      agent_id: 1,
      status: "Available",
      listing_type: "For Sale",
      video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder video
      floor_plan_url: "https://via.placeholder.com/800x600.png?text=Floor+Plan", // Placeholder image
      description:
        "Experience unparalleled luxury in this stunning oceanfront estate. Featuring breathtaking panoramic views, an open-concept living space, and a state-of-the-art gourmet kitchen. The master suite includes a private balcony overlooking the Pacific.",
      image_gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1661758956648-5afc2f7f4626?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387",
        "https://plus.unsplash.com/premium_photo-1733353221675-2ad78a83c43b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=871",
        "https://images.unsplash.com/photo-1758396469970-672a80778185?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
        "https://images.unsplash.com/photo-1744289262980-60b694dff46f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387",
      ]),
    },
    {
      title: "Skyline Penthouse",
      city: "New York, NY",
      price: 8900000.0,
      bedrooms: 4,
      bathrooms: 5,
      image:
        "https://images.unsplash.com/photo-1674494777503-f5d3484104c9?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      agent_id: 1,
      status: "Under Offer",
      listing_type: "For Sale",
      description:
        "A modern masterpiece in the sky. This duplex penthouse offers sweeping 360-degree views of the Manhattan skyline. Features include a private rooftop terrace, a chef's kitchen, and a custom wine cellar. The ultimate urban sanctuary.",
      image_gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1661758956648-5afc2f7f4626?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387",
        "https://plus.unsplash.com/premium_photo-1733353221675-2ad78a83c43b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=871",
        "https://images.unsplash.com/photo-1758396469970-672a80778185?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
        "https://images.unsplash.com/photo-1744289262980-60b694dff46f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387",
      ]),
    },
    {
      title: "Modern Mountain Retreat",
      city: "Aspen, CO",
      price: 6200000.0,
      bedrooms: 6,
      bathrooms: 6,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      agent_id: 1,
      status: "Under Offer",
      listing_type: "For Sale",
      description:
        "Nestled among the aspens, this architectural gem combines rustic charm with modern amenities. Enjoy ski-in/ski-out access, a heated outdoor pool, and a cozy great room with a stone fireplace. Perfect for family getaways or corporate retreats.",
      image_gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1661758956648-5afc2f7f4626?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387",
        "https://plus.unsplash.com/premium_photo-1733353221675-2ad78a83c43b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=871",
        "https://images.unsplash.com/photo-1758396469970-672a80778185?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
        "https://images.unsplash.com/photo-1744289262980-60b694dff46f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387",
      ]),
    },
  ]);
};
