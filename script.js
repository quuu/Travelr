

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

// Vue integration
var app = new Vue({
  el: '#app',
  data: {
    where: "Somewhere",
    when: "Sometime",
    who: "People",
    activities: [ "none" ]
  }
})

// function responsible for fetching the json contents of the file
// TODO, add parameter to read in file by name instead of hard coded
// returns: json object
function getJSONContents(){

  return fetch('/sample.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson){
      return myJson;
    });
}

var places;

getJSONContents().then(function(result) { places = result;});

// function that get's triggered when a marker is clicked
// responsible for updating the vue application with new marker information
function updateDescription(e) {


  console.log("wow you clicked " + e.target.customName);
  console.log(places);
  for(let i=0;i<places.places.length;i++){
    console.log(app);
    if(places.places[i].name == e.target.customName){
      const found = places.places[i];

      app.where = found.name;
      app.when = found.when;
      app.who = found.who;
      break;
    }

  }



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




