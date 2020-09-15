require('dotenv').config()

const fetch = require('node-fetch');
const apiKey = process.env.YELP_API; 


const searchRequest = {
  categories:'food, restaurants',
  location: '',
  price: '',
  latitude: '',
  longitude: '',
};


async function getYelpData(location, price) {
 
  let yelpURL = `https://api.yelp.com/v3/businesses/search?cagetories=${searchRequest.categories}&open_now=true&price=${price}&limit=50&location=${location}`;

  const response = await fetch(yelpURL,
    {
      headers: {
      Authorization: `Bearer ${apiKey}`
      }
    })
    const json = await response.json();
    return json.businesses;
}


function randomRestaurant(restaurants) {
  const randRestaurant = Math.floor(Math.random() * Math.floor(restaurants.length));
  let chosenRestaurant = {
    name: restaurants[randRestaurant].name,
    url: restaurants[randRestaurant].url,
    image: restaurants[randRestaurant].image_url,
    price: restaurants[randRestaurant].price,
    address: restaurants[randRestaurant].location.display_address,
    phone: restaurants[randRestaurant].display_phone,
  }
  return chosenRestaurant;
}

module.exports = function (){
  this.eatHere = async function(location, price) {
      let chosen;
      await getYelpData(location, price)
      .then((restaurantList)=> {
        chosen = randomRestaurant(restaurantList)
    })
    return chosen;
  }
}
