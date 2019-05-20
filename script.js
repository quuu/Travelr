var mymap = L.map('mapid').setView([51.505, -0.09], 2);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 10,
    id: 'mapbox.streets',
    continuousWorld: false,
    noWrap: true,
    accessToken: config.MAPBOX_KEY
}).addTo(mymap);

var marker = L.marker([51.5, -100]).addTo(mymap);


var opencageKey = config.OPENCAGEDATA_KEY;

function createMarkerFromLocation(loc){

  return fetch('https://api.opencagedata.com/geocode/v1/geojson?q='+loc+'&key='+opencageKey)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      L.marker([myJson.features[0].geometry.coordinates[1], myJson.features[0].geometry.coordinates[0]]).addTo(mymap);
      return myJson.features[0].geometry.coordinates;
    });

}

createMarkerFromLocation("Toronto").then(function(result){ console.log(result); } );
function w3_open() {
  document.getElementById("mySidebar").style.width = "100%";
  document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
}
