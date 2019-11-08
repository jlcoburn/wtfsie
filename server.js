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
app.get('/', (req, res) =>{
  res.render('index')
})

app.post('/', (req, res) => {
  const location = req.body.location
    getRestaurant(location).then((restaurant) => {
      res.render('rest', {restaurant: restaurant})

  })
});

async function getRestaurant(location) {
  let restaurant = await eatHere(location)
  return restaurant;
}

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found - ' + req.originalUrl);
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
