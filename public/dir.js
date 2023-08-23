// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">


//import myaxios from '../node_modules/axios';


const apiKey = 'AIzaSyBPcblOBNzRF6zi8xrbXLdrTWTPn7_P2JA';


let x=navigator.geolocation;
let mapOptions;
let mymarker;
let coords;



x.getCurrentPosition(success,failure);

function success(position){
  var mylat=position.coords.latitude;
  var mylong=position.coords.longitude;
 // var coords=new google.maps.LatLng(mylat,mylong);
 coords = { lat: mylat, lng: mylong };
  mapOptions={
    zoom: 13,
    center: coords,
    mapId: "DEMO_MAP_ID",
   // mapTypeId:google.maps.MapType.ROADMAP


  }
  /*mymarker = new AdvancedMarkerElement({
    map: map,
    position: coords,
    title: "Uluru",
  });*/
}

function failure(){

}


function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      mapTypeControl: false,
      
      center: { lat: 23.7266616, lng: 90.381105 } ,
      zoom: 13,
    });
  
    new AutocompleteDirectionsHandler(map);
  }
  
  class AutocompleteDirectionsHandler {
    map;
    originPlaceId;
    destinationPlaceId;
    travelMode;
    directionsService;
    directionsRenderer;
    constructor(map) {
      this.map = map;
      this.originPlaceId = "";
      this.destinationPlaceId = "";
      this.travelMode = google.maps.TravelMode.DRIVING;
      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionsRenderer.setMap(map);
  
      const originInput = document.getElementById("origin-input");
      const destinationInput = document.getElementById("destination-input");
      const modeSelector = document.getElementById("mode-selector");
      // Specify just the place data fields that you need.
      const originAutocomplete = new google.maps.places.Autocomplete(
        originInput,
        { fields: ["place_id"] },
      );
//console.log(originAutocomplete);
      // Specify just the place data fields that you need.
      const destinationAutocomplete = new google.maps.places.Autocomplete(
        destinationInput,
        { fields: ["place_id"] },
      );
  
      this.setupClickListener(
        "changemode-walking",
        google.maps.TravelMode.WALKING,
      );
      this.setupClickListener(
        "changemode-transit",
        google.maps.TravelMode.TRANSIT,
      );
      this.setupClickListener(
        "changemode-driving",
        google.maps.TravelMode.DRIVING,
      );
      this.setupPlaceChangedListener(originAutocomplete, "ORIG");
      this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
        destinationInput,
      );
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
    }
    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    setupClickListener(id, mode) {
      const radioButton = document.getElementById(id);
  
      radioButton.addEventListener("click", () => {
        this.travelMode = mode;
        this.route();
      });
    }
    setupPlaceChangedListener(autocomplete, mode) {
      autocomplete.bindTo("bounds", this.map);
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const idp=place.place_id;


      

// var options = {
//     host: 'maps.googleapis.com',
//     path: '/maps/api/geocode/json',
//     method: 'GET',
//     useQuerystring: true,
//     qs: 'place_id='+idp+'&key=AIzaSyBPcblOBNzRF6zi8xrbXLdrTWTPn7_P2JA'
// };

// var getreq = https.request(options, function(response) {
//     console.log("response: ",response);
//     //Uncomment the code below when you start getting valid responses
//     //response.on('data', function (chunk) {
//     //    console.log('BODY: ' + chunk);
//     //});
// });
// console.log(getreq);
// getreq.end();



        console.log('api req='+'https://maps.googleapis.com/maps/api/geocode/json?place_id='+idp+'&key=AIzaSyBPcblOBNzRF6zi8xrbXLdrTWTPn7_P2JA');
       // console.log("place is: ",);
        


//         const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${idp}&key=${apiKey}`;

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







        if (!place.place_id) {
          window.alert("Please select an option from the dropdown list.");
          return;
        }
  
        if (mode === "ORIG") {
          this.originPlaceId = place.place_id;
        } else {
          this.destinationPlaceId = place.place_id;
        }
  
        this.route();
      });
    }

    





    route() {
      if (!this.originPlaceId || !this.destinationPlaceId) {
        return;
      }
  
      const me = this;
  
      this.directionsService.route(
        {
          origin: { placeId: this.originPlaceId },
          destination: { placeId: this.destinationPlaceId },
          travelMode: this.travelMode,
        },
        async (response, status) => {
          if (status === "OK") {
            me.directionsRenderer.setDirections(response);

            //directionsRenderer.setDirections(response);
          //  console.log("distance is ="+ response.routes[0].legs[0].distance.text);
          //  console.log("Expected duration: "+ response.routes[0].legs[0].duration.text);
          //  console.log("response is ",response);
            const output=document.querySelector('#output');
              output.innerHTML="<div class='alert-info'> FROM:" + document.getElementById("origin-input").value +".<br/> To: "+ document.getElementById("destination-input").value+".<br/> Driving Distance: "+ response.routes[0].legs[0].distance.text+".<br/> Duration: "+ response.routes[0].legs[0].duration.text+".</div>";
              
              
              // Assuming you have a form and a button with the id "submit-button"

  const req_data = {
    origin: 'https://maps.googleapis.com/maps/api/geocode/json?place_id='+this.originPlaceId+'&key=AIzaSyBPcblOBNzRF6zi8xrbXLdrTWTPn7_P2JA',
    destination: 'https://maps.googleapis.com/maps/api/geocode/json?place_id='+this.destinationPlaceId+'&key=AIzaSyBPcblOBNzRF6zi8xrbXLdrTWTPn7_P2JA',
    travelMode: this.travelMode,
    distance: response.routes[0].legs[0].distance.text,
    duration: response.routes[0].legs[0].duration.text
  
  };
  const sendresponse = await fetch("/user/requests", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: req_data,
  });

  if (sendresponse.ok) {
    // Data saved successfully
    console.log("Data saved successfully");
    console.log("data is:",req_data);
  }

  else{
    console.log("Data not saved");
  }
              
              
              
              
              
              
              
              
              



          } else {
            window.alert("Directions request failed due to " + status);
          }
        },
      );
    }





  }
  
  window.initMap = initMap;