/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} role - 'admin' | 'member'
 * @property {string} membership_status - 'active' | 'pending' | 'suspended'
 * @property {string} [created_at]
 */

/**
 * @typedef {Object} Property
 * @property {number} id
 * @property {string} title
 * @property {string} city
 * @property {number} price
 * @property {number} bedrooms
 * @property {number} bathrooms
 * @property {string} image
 * @property {string} [description]
 * @property {Array<string>} [image_gallery]
 * @property {string} [status] - 'Available' | 'Sold' | 'Pending'
 * @property {string} [listing_type] - 'For Sale' | 'For Rent'
 * @property {string} [video_url]
 * @property {string} [floor_plan_url]
 * @property {number} [agent_id]
 */

/**
 * @typedef {Object} Agent
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} [phone]
 * @property {string} [bio]
 * @property {string} [profile_picture_url]
 */

/**
 * @typedef {Object} Blog
 * @property {number} id
 * @property {string} title
 * @property {string} slug
 * @property {string} [excerpt]
 * @property {string} content
 * @property {string} [cover_image_url]
 * @property {string} [author]
 * @property {string} [published_at]
 * @property {string} [created_at]
 * @property {string} [updated_at]
 */

export {};
