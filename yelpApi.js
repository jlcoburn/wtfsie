
const apiKey = 'ZQIZDTrZblEFPNprz4weB8AwkLACQQYMvKDqGil8kkCTkOCsjBR5SmV07mrU-9JX7fjFzIJj-00eLkVqyszHb7oWOx56KN5cPZDnlVLhYHqWw_f3MemBVWv5uXBpXHYx';
const fetch = require('node-fetch');

const searchRequest = {
  categories:'restaurants',
  location: '27360',
  price: '1,2,3,4',
  latitude: '',
  longitude: '',
};

const yelpURL = `https://api.yelp.com/v3/businesses/search?cagetories=${searchRequest.categories}&location=${searchRequest.location}&open_now=true&price=${searchRequest.price}`;

async function getYelpData() {
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
    price: restaurants[randRestaurant].price,
    address: restaurants[randRestaurant].location.display_address,
    phone: restaurants[randRestaurant].display_phone,
  }
  return chosenRestaurant;
}

module.exports = function (){
  this.eatHere = async function() {
      let chosen;
      await getYelpData()
      .then((restaurantList)=> {
        chosen = randomRestaurant(restaurantList)
    })
    return chosen;
  }
}
