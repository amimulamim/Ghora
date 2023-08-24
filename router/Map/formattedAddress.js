const axios = require('axios');
const apiKey = 'AIzaSyBPcblOBNzRF6zi8xrbXLdrTWTPn7_P2JA';

async function getPlaceName(latitude, longitude) {
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const results = response.data.results;

    if (results && results.length > 0) {
      return results[0].formatted_address;
    } else {
      return 'Place not found';
    }
  } catch (error) {
    console.error('Error getting place name:', error.message);
    return 'Error getting place name';
  }
}


module.exports=
{
    getPlaceName
}

// address.getPlaceName(reqpickup.lat, reqpickup.lng)
// .then(placeName => {
//   console.log('Place:', placeName);
// })
// .catch(error => {
//   console.error(error);
// });