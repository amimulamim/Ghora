
const apiKey = 'AIzaSyBPcblOBNzRF6zi8xrbXLdrTWTPn7_P2JA';





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

module.exports = { calculateDistance }

// let distbetween ;
// let durationbetween;

// mapCalc.calculateDistance(reqpickup, reqdropoff)
// .then(result => {
// // const { distance, duration } = result;
// // console.log(`Distance: ${distance}`);
// // console.log(`Duration: ${duration}`);
// distbetween=result.distance;
// durationbetween=result.duration;
// console.log("distbetween=",distbetween);
// console.log("durationbetween=",durationbetween);
// })
// .catch(error => {
// console.error(error);
// });