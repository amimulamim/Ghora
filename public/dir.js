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





async function getLiveLocation() {
  if ('geolocation' in navigator) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      return { lat: latitude, lng: longitude };
    } catch (error) {
      throw new Error('Failed to retrieve location: ' + error.message);
    }
  } else {
    throw new Error('Geolocation is not supported in this browser.');
  }
}

// Example usage:





async function initMap() {
  //alert(1);
 // await curloc();
 let centercoords;
 await getLiveLocation()
  .then(location => {
    console.log('Live Location:', location);
    centercoords=location;
    console.log('center coords',centercoords);
  })
  .catch(error => {
    console.error(error);
  });
  console.log('liveloc= ',coords);
  const map = new google.maps.Map(document.getElementById("map"), {
    mapTypeControl: false,
    //center:coords,
    center: centercoords,
    zoom: 13,
    mapId: "DEMO_MAP_ID"
  });
  const data = await fetch('/driver/allLocation');
      const locbe=await data.json();
      console.log('got location at front end dir is: ',locbe);
      //console.log('got location at back end running is: ',locbe);
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

    const svgMarker = {
      path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
      fillColor: "blue",
      fillOpacity: 0.6,
      strokeWeight: 0,
      rotation: 0,
      scale: 2,
      anchor: new google.maps.Point(0, 20),
    };
    const curlocicon={
      url: './images/curloc.jpg',
      scaledSize: new google.maps.Size(32, 32),

    }
  const marker=new google.maps.Marker({
    map:map,
    position:centercoords,
    title:"Your current location",
     icon:curlocicon,
   });
   


  const carIcon = {
    url: './images/caricon2.png', // Path to the car icon image
    scaledSize: new google.maps.Size(44,25), // Set the size of the icon
  };

   const bikeIcon = {
    url: './images/motoicon.png', // Path to the bike icon image
    scaledSize: new google.maps.Size(44, 25), // Set the size of the icon
  };

  const cngIcon = {
    url: './images/cngicon.png', // Path to the CNG icon image
    scaledSize: new google.maps.Size(42.2, 27.5), // Set the size of the icon
  };

  // Create markers with custom icons and positions

  const locArray= locbe.locArray;
  for(let i=0; i<locArray.length; i++) {
    //console.log("loop theke=",locArray[i])
    if(locArray[i].V_TYPE=='CAR'){
      new google.maps.Marker({
        position: { lat: locArray[i].LAT, lng: locArray[i].LNG }, // Set car marker position
        map: map,
        icon: carIcon, // Set car icon
      });
    }
    else if(locArray[i].V_TYPE=='BIKE'){
      new google.maps.Marker({
        position: { lat: locArray[i].LAT, lng: locArray[i].LNG }, // Set car marker position
        map: map,
        icon: bikeIcon, // Set car icon
      });
    }
    else if(locArray[i].V_TYPE=='CNG'){
      new google.maps.Marker({
        position: { lat: locArray[i].LAT, lng: locArray[i].LNG }, // Set car marker position
        map: map,
        icon: cngIcon, // Set car icon
      });
    }
  }
  // const carMarker = new google.maps.Marker({
  //   position: { lat: 23.72, lng: 90.38 }, // Set car marker position
  //   map: map,
  //   icon: carIcon, // Set car icon
  // });

  // const bikeMarker = new google.maps.Marker({
  //   position: { lat: 23.73, lng: 90.42 }, // Set bike marker position
  //   map: map,
  //   icon: bikeIcon, // Set bike icon
  // });

  // const cngMarker = new google.maps.Marker({
  //   position: { lat: 23.74, lng: 90.40 }, // Set CNG marker position
  //   map: map,
  //   icon: cngIcon, // Set CNG icon
  // });







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
      console.log("dist,dura= ",this.distanceBetween,' ',this.durationBetween);
      console.log("fare= ",this.carfare);
      let fare= this.carfare;
      if(id=='Bike'){
        fare=this.bikefare;
      }
      else if(id=='CNG'){fare=this.cngfare;}
      console.log("fare is :",fare);

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
              localStorage.setItem('loadInfo', 'true');
             // window.location = '/user/info';
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

                //window.location = '/user/wallet';
                localStorage.setItem('loadWallet', 'true');

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

  showRoute(){
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
          this.distanceBetween= response.routes[0].legs[0].distance.text;
          this.durationBetween=response.routes[0].legs[0].duration.text;



          this.carbutton = document.getElementById("Car");
          this.bikebutton = document.getElementById("Bike");
          this.cngbutton = document.getElementById("CNG");
          // Show the button
          const distnce = parseFloat(response.routes[0].legs[0].distance.text);
          const duratn = parseFloat(response.routes[0].legs[0].duration.text);
          const carfare = Math.max(distnce * 100, duratn * 30);
          const bikefare = Math.max(distnce * 50, duratn * 15);
          const cngfare = Math.max(distnce * 75, duratn * 25);

          this.carfare=carfare;
          console.log("inserted cf,this cf= ",carfare,this.carfare);
          this.bikefare=bikefare;
          this.cngfare=cngfare;
          
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





  async route() {
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
          const output = document.querySelector('#output');
          //   response.routes[0].legs[0].distance.text
          //   for (let i = 0; i < ; i++) {
          //     console.log( myroute.legs[i].distance.value);
          // }
          output.innerHTML = "<div class='alert-info'> FROM:" + document.getElementById("origin-input").value + ".<br/> To: " + document.getElementById("destination-input").value + ".<br/> Driving Distance: " + response.routes[0].legs[0].distance.text + ".<br/> Duration: " + response.routes[0].legs[0].duration.text + ".</div>";


          // Assuming you have a form and a button with the id "submit-button"

          const req_data = {
            origin: 'https://maps.googleapis.com/maps/api/geocode/json?place_id=' + this.originPlaceId + '&key=AIzaSyBPcblOBNzRF6zi8xrbXLdrTWTPn7_P2JA',
            destination: 'https://maps.googleapis.com/maps/api/geocode/json?place_id=' + this.destinationPlaceId + '&key=AIzaSyBPcblOBNzRF6zi8xrbXLdrTWTPn7_P2JA',
            origin: 'https://maps.googleapis.com/maps/api/geocode/json?place_id=' + this.originPlaceId + '&key=AIzaSyBPcblOBNzRF6zi8xrbXLdrTWTPn7_P2JA',
            destination: 'https://maps.googleapis.com/maps/api/geocode/json?place_id=' + this.destinationPlaceId + '&key=AIzaSyBPcblOBNzRF6zi8xrbXLdrTWTPn7_P2JA',
            travelMode: this.travelMode,
            distance: response.routes[0].legs[0].distance.text,
            duration: response.routes[0].legs[0].duration.text,
            v_type: 'CAR',
            fare: 100

          };

          const carbutton = document.getElementById("Car");
          const bikebutton = document.getElementById("Bike");
          const cngbutton = document.getElementById("CNG");
          // Show the button
          const distnce = parseFloat(response.routes[0].legs[0].distance.text);
          const duratn = parseFloat(response.routes[0].legs[0].duration.text);
          const carfare = Math.max(distnce * 100, duratn * 30);
          var bikefare = Math.max(distnce * 50, duratn * 15);
          var cngfare = Math.max(distnce * 75, duratn * 25);
          console.log("carfare =", carfare);
          console.log("bikefare =", bikefare);
          console.log("cngfare =", cngfare);
          carbutton.style.display = "block";
          carbutton.textContent = "Car " + carfare + " Tk";
          bikebutton.style.display = "block";
          bikebutton.textContent = "Bike " + bikefare + " Tk";
          cngbutton.style.display = "block";
          cngbutton.textContent = "CNG " + cngfare + " Tk";



          carbutton.addEventListener("click", async () => {
            req_data.v_type = 'CAR';
            req_data.fare = carfare;
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
              if (BALANCE >= carfare) {
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

          bikebutton.addEventListener("click", async () => {
            req_data.v_type = 'BIKE';
            req_data.fare = bikefare;
            const data = await fetch('user/requests/allowed')
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
              if (BALANCE >= bikefare) {
                console.log('req sent successfully');
                await sendingResponse();
                localStorage.setItem('reloadUser', 'true');
                //setTimeout(() => location.reload(), 2000)
              
              }
              else {
                alert('You Do not have enough balance in your wallet to request for this ride');
                window.location = '/user/wallet';

              }
            }
           // await sendingResponse();
          });

          cngbutton.addEventListener("click", async () => {
            req_data.v_type = 'CNG';
            req_data.fare = cngfare;
           // await sendingResponse();
           const data = await fetch('user/requests/allowed')
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
             if (BALANCE >= cngfare) {
               console.log('req sent successfully');
               await sendingResponse();
               localStorage.setItem('reloadUser', 'true');
              // setTimeout(() => location.reload(), 2000)
               

             }
             else {
               alert('You Do not have enough balance in your wallet to request for this ride');
               window.location = '/user/wallet';

             }
           }
          });





          async function sendingResponse() {
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












        } else {
          window.alert("Directions request failed due to " + status);
        }
      },
    );
  }





}

window.initMap = initMap;