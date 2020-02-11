function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  let locationBox = document.getElementById('locationBox');
  locationBox.value = ` ${position.coords.latitude}, ${position.coords.longitude}`;
}


function showValue (value, origin) {
  let newValue = '';

  for (let i = 1; i <= value; i++) {
    newValue += '$'
  }
  if (origin.name === 'min_price_slider') {
    document.querySelector('#min_price_display').innerHTML = newValue;
  } else {
    document.querySelector('#max_price_display').innerHTML = newValue;
  }
  //TODO: Clean this up so I'm not repeating the above code
  if (document.querySelector('#max_price_slider').value < document.querySelector('#min_price_slider').value) {
    let maxValue = ''
    document.querySelector('#max_price_slider').value = document.querySelector('#min_price_slider').value
    for (let i = 1; i <= document.querySelector('#min_price_slider').value; i++) {
      maxValue += '$'
    }
    document.querySelector('#max_price_display').innerHTML = maxValue;
  }

}