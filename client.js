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


function showMinValue (value, origin) {
  let newValue = '';
  switch (value) {
    case '1': newValue = '$';
    console.log(newValue)
    break;
    case '2':  newValue = '$$';
    break;
    case '3': newValue = '$$$';
    break;
    case '4': newValue = '$$$$';
    break;
    default: newValue = '$'
  }
  if (origin.name === 'min_price_slider') {
    document.querySelector('#min_price_display').innerHTML = newValue;
  } else {
    document.querySelector('#max_price_display').innerHTML = newValue;
  }

  if (document.querySelector('#max_price_slider').value < document.querySelector('#min_price_slider').value) {
    document.querySelector('#max_price_slider').value = document.querySelector('#min_price_slider').value
  }


}