async function initMap() {
    const dirdata=await getPoints();   
    console.log("dirdata  =", dirdata);

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: { lat: dirdata.PLAT, lng: dirdata.PLNG }, // Dhaka.
    });
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: true,
        map,
        panel: document.getElementById("panel"),
    });

    directionsRenderer.addListener("directions_changed", () => {
        const directions = directionsRenderer.getDirections();

        if (directions) {
            computeTotalDistance(directions);
        }
    });
    displayRoute(
        
        
        dirdata,
        directionsService,
        directionsRenderer,
    );
}
async function getPoints(){
    const data = await fetch('driver/accept/location');
      const locbe=await data.json();
      console.log('got location at front end steps is: ',locbe);
    return locbe;


}

function displayRoute(dirdata, service, display) {
    service
        .route({
            origin:  {lat:dirdata.PLAT,lng:dirdata.PLNG},
    
            destination:  { lat:dirdata.DLAT,lng:dirdata.DLNG },
            // waypoints: [
            //     { location: "Adelaide, SA" },
            //     { location: "Broken Hill, NSW" },
            //],
            travelMode: google.maps.TravelMode.DRIVING,
            avoidTolls: true,
        })
        .then((result) => {
            display.setDirections(result);
        })
        .catch((e) => {
            alert("Could not display directions due to: " + e);
        });
}

function computeTotalDistance(result) {
    let total = 0;
    const myroute = result.routes[0];

    if (!myroute) {
        return;
    }

    for (let i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }

    total = total / 1000;
    document.getElementById("total").innerHTML = total + " km";
}

window.initMap = initMap;