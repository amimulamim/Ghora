// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">


//import myaxios from '../node_modules/axios';


const apiKey = 'AIzaSyBPcblOBNzRF6zi8xrbXLdrTWTPn7_P2JA';


let x = navigator.geolocation;
let mapOptions;
let mymarker;
let coords;



x.getCurrentPosition(success, failure);

function success(position) {
  var mylat = position.coords.latitude;
  var mylong = position.coords.longitude;
  // var coords=new google.maps.LatLng(mylat,mylong);
  coords = { lat: mylat, lng: mylong };
  mapOptions = {
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

function failure() {

}

// function initMap(){
//   const until=setInterval(() => {
//     if(coords===undefined){
//       return;
//     }
//     else{
//       initializeMap();
//       clearInterval(until);
//     }

//   }, 1000);


// }

function initMap() {
  //alert(1);
  const map = new google.maps.Map(document.getElementById("map"), {
    mapTypeControl: false,
    // center:coords
    center: { lat: 23.7266616, lng: 90.381105 },
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
  carfare;
  bikefare;
  cngfare;
  distanceBetween;
  durationBetween;
  carbutton;
  bikebutton;
  cngbutton;
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
      "Car",

    );
    this.setupClickListener(
      "Bike",

    );
    this.setupClickListener(
      "CNG",

    );
    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      destinationInput,
    );
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
    //const carbutton=
  }
  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  setupClickListener(id) {
    const rideButton = document.getElementById(id);

    async function sendingResponse(req_data) {
      const sendresponse = await fetch("/user/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req_data),
      });

      if (sendresponse.ok) {
        // Data saved successfully
        console.log("Data saved successfully");
        console.log("data is:", req_data);
      }

      else {
        console.log("Data not saved");
      }
    }

    rideButton.addEventListener("click", async () => {
      console.log("dist,dura= ", this.distanceBetween, ' ', this.durationBetween);
      console.log("fare= ", this.carfare);
      let fare = this.carfare;
      if (id == 'Bike') {
        fare = this.bikefare;
      }
      else if (id == 'CNG') { fare = this.cngfare; }
      console.log("fare is :", fare);

      const req_data = {
        origin: 'https://maps.googleapis.com/maps/api/geocode/json?place_id=' + this.originPlaceId + '&key=AIzaSyBPcblOBNzRF6zi8xrbXLdrTWTPn7_P2JA',
        destination: 'https://maps.googleapis.com/maps/api/geocode/json?place_id=' + this.destinationPlaceId + '&key=AIzaSyBPcblOBNzRF6zi8xrbXLdrTWTPn7_P2JA',
        travelMode: this.travelMode,
        distance: this.distanceBetween,
        duration: this.durationBetween,
        v_type: id.toUpperCase(),
        fare: fare

      };

      const data = await fetch('user/requests/allowed');
            const text = await data.text();
            //alert("got text: " + text);
            if (text.includes('must')) {
              alert('Your Must add a Wallet to request for a ride');
              //clearInterval(timer);
              window.location = '/user/info';
            }
            else if (text.includes('BALANCE')) {
              // alert('Your Ride Request Has ALREEEEEEAAAAAAAAADY Been Accepted')
              //clearInterval(timer);
              //window.location = '/user/running'
              console.log('text= ', text);
              //const BALANCE=parseFloat(text);
              // Sample text containing the balance information
              let BALANCE = 0;

        // Regular expression pattern to match a number (integer or floating-point)
        const pattern = /[-+]?\d*\.?\d+/;

        // Extract the number from the text
        const match = text.match(pattern);

        if (match) {
          const number = parseFloat(match[0]);
          BALANCE = number;
          console.log(number);
        } else {
          console.log("Number not found in the text.");
        }

              //console.log('front end e wallet data: ' + JSON.stringify(data));
              console.log('front end e balance= ', BALANCE);
              if (BALANCE >= fare) {
                console.log('req sent successfully');
                await sendingResponse(req_data);
                localStorage.setItem('reloadUser', 'true');
                // setTimeout(() => location.reload(), 2000)
              }
              else {
                alert('You Do not have enough balance in your wallet to request for this ride');
                window.location = '/user/wallet';

        }
      }


    });
  }
  setupPlaceChangedListener(autocomplete, mode) {
    autocomplete.bindTo("bounds", this.map);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      const idp = place.place_id;








      console.log('api req=' + 'https://maps.googleapis.com/maps/api/geocode/json?place_id=' + idp + '&key=AIzaSyBPcblOBNzRF6zi8xrbXLdrTWTPn7_P2JA');





      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }

      if (mode === "ORIG") {
        this.originPlaceId = place.place_id;
      } else {
        this.destinationPlaceId = place.place_id;
      }

      this.showRoute();
    });
  }

  showRoute() {
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


          const output = document.querySelector('#output');

          output.innerHTML = "<div class='alert-info'> FROM:" + document.getElementById("origin-input").value + ".<br/> To: " + document.getElementById("destination-input").value + ".<br/> Driving Distance: " + response.routes[0].legs[0].distance.text + ".<br/> Duration: " + response.routes[0].legs[0].duration.text + ".</div>";
          this.distanceBetween = response.routes[0].legs[0].distance.text;
          this.durationBetween = response.routes[0].legs[0].duration.text;



          this.carbutton = document.getElementById("Car");
          this.bikebutton = document.getElementById("Bike");
          this.cngbutton = document.getElementById("CNG");
          // Show the button
          const distnce = parseFloat(response.routes[0].legs[0].distance.text);
          const duratn = parseFloat(response.routes[0].legs[0].duration.text);
          const carfare = Math.max(distnce * 100, duratn * 30);
          const bikefare = Math.max(distnce * 50, duratn * 15);
          const cngfare = Math.max(distnce * 75, duratn * 25);

          this.carfare = carfare;
          console.log("inserted cf,this cf= ", carfare, this.carfare);
          this.bikefare = bikefare;
          this.cngfare = cngfare;

          this.carbutton.style.display = "block";
          this.carbutton.textContent = "Car " + carfare + " Tk";
          this.bikebutton.style.display = "block";
          this.bikebutton.textContent = "Bike " + bikefare + " Tk";
          this.cngbutton.style.display = "block";
          this.cngbutton.textContent = "CNG " + cngfare + " Tk";



        }
        else {
          window.alert("Directions request failed due to " + status);
        }

      }
    );
  }
}

window.initMap = initMap;