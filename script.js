

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


// function that get's triggered when a marker is clicked
// responsible for updating the vue application with new marker information
function updateDescription(e) {


  console.log("wow you clicked " + e.target.customName);



}

function createMarkerFromLocation(loc){

  return fetch('https://api.opencagedata.com/geocode/v1/geojson?q='+loc+'&key='+opencageKey)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      let mark = L.marker([myJson.features[0].geometry.coordinates[1], myJson.features[0].geometry.coordinates[0]]).addTo(mymap).on('click', updateDescription);
      mark.customName = loc;
      return myJson.features[0].geometry.coordinates;
    });

}

//initial marker
createMarkerFromLocation("Toronto", opencageKey).then(function(result){ console.log(result); } );



fetch('/sample.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson){
    console.log(myJson);
  });


// Vue integration
var app = new Vue({
  el: '#app',
  data: {
    message: "Hello Vue!"
  }
})

