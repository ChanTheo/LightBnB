const properties = require('./json/properties.json');
const users = require('./json/users.json');

// install pg and connect to the database 

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  return pool.query(`
  SELECT id, name, email, password 
  FROM users
  WHERE email = $1
  `, [email])
  .then(res => res.rows[0])
   .catch(err => err.stack);
    


  // let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  // return Promise.resolve(user);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

return pool.query(`
  SELECT *
  FROM users
  WHERE id = $1
  `, [id])
  .then(res => res.rows[0])
   .catch(err => err.stack);
    

  // return Promise.resolve(users[id]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {

  const values = [user.name, user.email, user.password]

  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1,$2,$3)
  RETURNING *
  `, values)
  .then(res => res.rows[0])
  .catch(err => err.stack);

  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const values = [guest_id, limit]

  return pool.query(`
SELECT properties.*, reservations.*, avg(rating) as average_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id 
WHERE reservations.guest_id = $1
AND reservations.end_date < now()::date
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT $2;
  `, values)
  .then(res => res.rows)
  .catch(err => err.stack);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

// {
//   city,
//   owner_id,
//   minimum_price_per_night,
//   maximum_price_per_night,
//   minimum_rating
// }
 
const getAllProperties = function(options, limit = 10) {
  

  let queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  } 
  if (options.owner_id) {

    if(queryParams.length === 1){
      queryString += `WHERE `
    } else {
      queryString += `AND `
    }
      queryParams.push(`%${options.owner_id}%`)
      
      queryString += `owner_id LIKE $${queryParams.length} `
  } 
  if (options.minimum_price_per_night && options.maximum_price_per_night) {

    if(queryParams.length === 1){
      queryString += `WHERE `
    } else {
      queryString += `AND `
    }
   
    queryParams.push(`${options.minimum_price_per_night}`)
    queryString += `cost_per_night >= $${queryParams.length} `
    queryParams.push(`${options.maximum_price_per_night}`)
    queryString += `AND cost_per_night <= $${queryParams.length} `
  }

  if (options.minimum_rating) {
    if(queryParams.length === 1) {
      queryString += `WHERE `
    } else {
      queryString += `AND `
    }
    
    queryParams.push(`${options.minimum_rating}`)
    queryString += `property_reviews.rating >= $${queryParams.length} `
    
  }

  // console.log(queryParams)
  
  queryParams.push(limit);
  
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  
  return pool.query(queryString, queryParams)
  .then(res => res.rows);


}
  // const limitedProperties = {};
  // for (let i = 1; i <= limit; i++) {
  //   limitedProperties[i] = properties[i];
  // }
  // return Promise.resolve(limitedProperties);

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
