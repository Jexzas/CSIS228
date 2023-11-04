"use strict";
/*  JavaScript 7th Edition
    Chapter 10
    Chapter case

    Oak Top House Directions
    Author: Jesse Roberts
    Date:   11/4/23

    Filename: js10b.js
*/


// Function to set up and display the Oak Top House Map
function initMap() {
   
    // Page objects
    let displayMap = document.getElementById("displayMap");
    let routeBox =    document.getElementById("routeBox");
    // Create a map of the Oak Top House
    let oakTopHouse = {lat: 39.96118, lng: -82.99879}
    let myMap = new google.maps.Map(displayMap, {
        zoom: 11,
        center: oakTopHouse,
        fullscreenControl: false
    })
    // Add a marker
    new google.maps.Marker({
        position: oakTopHouse,
        map: myMap,
        title: "Oak Top House"
    })
    // get geolocate
    navigator.geolocation.getCurrentPosition(getPos, handleError);
    function getPos(pos) {
        let myPosition = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
        }
        console.log(myPosition);
        // set up directions
        let routeFind = new google.maps.DirectionsService();
        let routeDraw = new google.maps.DirectionsRenderer();
        let myRoute = {
            origin: myPosition,
            destination: oakTopHouse,
            travelMode: "DRIVING"
        }
        // generate directions
        routeFind.route(myRoute, function (result, status) {
            if (status == "OK") {
                routeDraw.setDirections(result);
            } else {
                routeBox.textContent = "Directions unavailable: " + status;
            }
        })
        // Display directions
        routeDraw.setMap(myMap);
        routeDraw.setPanel(routeBox);
    }
    function handleError(err) {
        console.error("Geolocation error: " + err.message);
    }
 
}


