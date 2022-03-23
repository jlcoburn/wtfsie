const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')
require('./yelpApi.js')();
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.set('view engine','ejs')
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}))

// Routes

app.get('/', (req, res) =>{
  res.render('index')
})

app.post('/', (req, res) => {
  const location = req.body.location;
  const minPrice = req.body.min_price_slider;
  const maxPrice = req.body.max_price_slider;
  let price = '';
  for (let i = minPrice; i <= maxPrice; i++) {
    price += i + ','
  }
  price = price.slice(0,-1) //remove trailing comma from price string
  getRestaurant(location, price).then((restaurant) => {
    //res.render('rest', {restaurant: restaurant})
    res.send({restaurant: restaurant})

  })
});

async function getRestaurant(location, price) {
  let restaurant = await eatHere(location,price)
  return restaurant;
}

function notFound(req, res, next) {
  res.status(404);
  res.render('404')
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port', port);
});
