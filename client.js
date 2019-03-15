function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function sendLocation() {
  let locationValue = document.getElementById('location').value;
  console.log(locationValue);
}

function showPosition(position) {
  console.log(`lattitude: ${position.coords.latitude} longitude:  ${position.coords.longitude}`);
}