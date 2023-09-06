
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">



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
  
      //const originInput = document.getElementById("origin-input");
      //const destinationInput = document.getElementById("destination-input");
      //const modeSelector = document.getElementById("mode-selector");
      // Specify just the place data fields that you need.
    //   const originAutocomplete = new google.maps.places.Autocomplete(
    //     originInput,
    //     { fields: ["place_id"] },
    //   );
    //   // Specify just the place data fields that you need.
    //   const destinationAutocomplete = new google.maps.places.Autocomplete(
    //     destinationInput,
    //     { fields: ["place_id"] },
    //   );
  
    //   this.setupClickListener(
    //     "changemode-walking",
    //     google.maps.TravelMode.WALKING,
    //   );
    //   this.setupClickListener(
    //     "changemode-transit",
    //     google.maps.TravelMode.TRANSIT,
    //   );
    //   this.setupClickListener(
    //     "changemode-driving",
    //     google.maps.TravelMode.DRIVING,
    //   );
    //   this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    //   this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
    //   this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    //   this.map.controls[google.maps.ControlPosition.TOP_LEFT].pus
    //     destinationInput,
    //   );
    //   this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
      this.route();
    }
    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    // setupClickListener(id, mode) {
    //   const radioButton = document.getElementById(id);
  
    //   radioButton.addEventListener("click", () => {
    //     this.travelMode = mode;
    //     this.route();
    //   });
    // }
    // setupPlaceChangedListener(autocomplete, mode) {
    //   autocomplete.bindTo("bounds", this.map);
    //   autocomplete.addListener("place_changed", () => {
    //     const place = autocomplete.getPlace();
  
    //     if (!place.place_id) {
    //       window.alert("Please select an option from the dropdown list.");
    //       return;
    //     }
  
    //     if (mode === "ORIG") {
    //       this.originPlaceId = place.place_id;
    //     } else {
    //       this.destinationPlaceId = place.place_id;
    //     }
  
    //     this.route();
    //   });
    // }
    async route() {
    //   if (!this.originPlaceId || !this.destinationPlaceId) {
    //     return;
    //   }
  
      const me = this;

      const data = await fetch('user/running/location');
      const locbe=await data.json();
      console.log('got location at front end running is: ',locbe);



  
      this.directionsService.route(
        {
          origin: {lat:locbe.PLAT,lng:locbe.PLNG },
          destination: { lat:locbe.DLAT,lng: locbe.DLNG },
          travelMode: this.travelMode,
        },
        (response, status) => {
          if (status === "OK") {
            me.directionsRenderer.setDirections(response);

            //directionsRenderer.setDirections(response);
           console.log("distance is ="+ response.routes[0].legs[0].distance.text);
           console.log("Expected duration: "+ response.routes[0].legs[0].duration.text);
            const output=document.querySelector('#output');
            //  output.innerHTML="<div class='alert-info'> FROM:" + document.getElementById("origin-input").value +".<br/> To: "+ document.getElementById("destination-input").value+".<br/> Driving Distance: "+ response.routes[0].legs[0].distance.text+".<br/> Duration: "+ response.routes[0].legs[0].duration.text+".</div>";
              //directionsRenderer.setDirections(response);





          } else {
            window.alert("Directions request failed due to " + status);
          }
        },
      );
    }
  }
  
  window.initMap = initMap;