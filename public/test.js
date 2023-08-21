// Initialize and add the map

(g => { var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window; b = b[c] || (b[c] = {}); var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => { await (a = m.createElement("script")); e.set("libraries", [...r] + ""); for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]); e.set("callback", c + ".maps." + q); a.src = `https://maps.${c}apis.com/maps/api/js?` + e; d[q] = f; a.onerror = () => h = n(Error(p + " could not load.")); a.nonce = m.querySelector("script[nonce]")?.nonce || ""; m.head.append(a) })); d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)) })({ key: "AIzaSyBPcblOBNzRF6zi8xrbXLdrTWTPn7_P2JA", v: "beta" });

let map;

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


async function initMap() {
  // The location of Uluru

  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");


  // The map, centered at Uluru
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  /*{
    zoom: 13,
    center: position,
    mapId: "DEMO_MAP_ID",
  });*/

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: coords,
    title: "Uluru"
  });

}

// initMap();


function displayRoute() {
  var start = coords;
  var end = new google.maps.LatLng(23.72082, 90.307241);
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    mapId: "DEMO_MAP_ID",
    center:coords,
  });

  var directionsDisplay = new google.maps.DirectionsRenderer();// also, constructor can get "DirectionsRendererOptions" object
  directionsDisplay.setMap(map); // map should be already initialized.

  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  var directionsService = new google.maps.DirectionsService();
  directionsService.route(request, function (response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

displayRoute();