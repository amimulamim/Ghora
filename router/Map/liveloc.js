// const https = require('https');
// const axios = require('axios');


// const apiKey = 'AIzaSyBPcblOBNzRF6zi8xrbXLdrTWTPn7_P2JA';

// const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${idp}&key=${apiKey}`;

// axios.get(apiUrl)
//   .then(response => {
//     if (response.data.status === 'OK') {
//       const location = response.data.results[0].geometry.location;
//       const latitude = location.lat;
//       const longitude = location.lng;
//       console.log(`Latitude: ${latitude}`);
//       console.log(`Longitude: ${longitude}`);
//     } else {
//       console.log('Geocoding API request failed.');
//     }
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });