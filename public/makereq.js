// Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual Google Maps API key
const apiKey = 'AIzaSyBPcblOBNzRF6zi8xrbXLdrTWTPn7_P2JA';

async function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: { lat: 23.7266616, lng: 90.381105 } 
  });
  
  directionsRenderer.setMap(map);
  
  const startInput = document.getElementById('start');
  const destinationInput = document.getElementById('destination');
  console.log("got start input :"+JSON.stringify(startInput));
  console.log("got destination input :"+JSON.stringify(destinationInput));  
  const autocompleteStart = new google.maps.places.Autocomplete(startInput);
  const autocompleteDestination = new google.maps.places.Autocomplete(destinationInput);
  
  document.getElementById('calculateRoute').addEventListener('click', () => {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  });
  
  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    const startPlace = autocompleteStart.getPlace();
    const destinationPlace = autocompleteDestination.getPlace();
    
    if (!startPlace || !destinationPlace) {
      alert('Please select valid start and destination locations.');
      return;
    }
    
    directionsService.route(
      {
        origin: startPlace.formatted_address,
        destination: destinationPlace.formatted_address,
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.IMPERIAL
      },
      (response, status) => {
        if (status === google.maps.DirectionStatus.OK) {
          directionsRenderer.setDirections(response);
          const output=document.querySelector('#output');
            output.innerHTML="<div class='alert-info'> FROM:" + document.getElementById("start").value +".<br/> To: "+ document.getElementById("destination").value+".<br/> Driving Distance: "+ response.routes[0].legs[0].distance.text+".<br/> Duration: "+ response.routes[0].legs[0].duration+".</div>";
            directionsRenderer.setDirections(response);


        } else {
            directionsRenderer.setDirections({routes:[]});
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }
}

var options={
    types:['']
}

initMap();