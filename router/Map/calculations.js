
const apiKey = 'AIzaSyBPcblOBNzRF6zi8xrbXLdrTWTPn7_P2JA';



// // Creating a Google Maps Distance Matrix API URL

// function getDistanceDuration(origin, destination) {
// const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=${apiKey}`;
// let pathdistance;
// let pathduration;
// // Make a fetch request to the API
// fetch(apiUrl)
//   .then(response => response.json())
//   .then(data => {
//     // Extract distance and duration
//      pathdistance = data.rows[0].elements[0].distance.text;
//      pathduration = data.rows[0].elements[0].duration.text;

//    // console.log(`Distance: ${pathdistance}`);
// //console.log(`Duration: ${pathduration}`);
//     const result={
//         distance: pathdistance,
//         duration: pathduration
//     }
//    // console.log(`distanceDuration: ${distanceDuration}`);
//     console.log("at calc",distanceDuration);
//     return result;
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// }

// module.exports={
//     getDistanceDuration
// }
// distanceCalculator.js

// Replace with your API key


// Function to calculate distance and duration
async function calculateDistance(reqpickup, reqdropoff) {
  const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${reqpickup.lat},${reqpickup.lng}&destinations=${reqdropoff.lat},${reqdropoff.lng}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 'OK') {
      const distance = data.rows[0].elements[0].distance.text;
      const duration = data.rows[0].elements[0].duration.text;
      return { distance, duration };
    } else {
      throw new Error('Unable to calculate distance');
    }
  } catch (error) {
    throw new Error('Error calculating distance: ' + error.message);
  }
}

module.exports = {calculateDistance}
;
