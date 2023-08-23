// Initialize and add the map
let map;
let coords;



let x=navigator.geolocation;
let mapOptions;
let mymarker;




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


async function initMap() {
  // The location of Uluru
  
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  
  // The map, centered at Uluru
  map = new google.maps.Map(document.getElementById("map"),mapOptions); 
  const trafficLayer = new google.maps.TrafficLayer();

  trafficLayer.setMap(map);
  /*{
    zoom: 13,
    center: position,
    mapId: "DEMO_MAP_ID",
  });*/

  // The marker, positioned at Uluru
  const marker=new AdvancedMarkerElement({
    map:map,
    position:coords,
    title:"Your current location"
  });


  
}

initMap();