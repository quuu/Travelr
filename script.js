

/*
 * initial map displaying and getting the user API keys
 */
const mymap = L.map('mapid').setView([51.505, -0.09], 2);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 2,
  minZoom: 2,
  id: 'mapbox.light',
  continuousWorld: false,
  noWrap: true,
  accessToken: config.MAPBOX_KEY
}).addTo(mymap);


//prevent the map from being dragged outside of the view
const southWest = L.latLng(-89.98155760646617, -180);
const northEast = L.latLng(89.99346179538875, 180);
const bounds = L.latLngBounds(southWest, northEast);

mymap.setMaxBounds(bounds);
mymap.on('drag', function() {
    mymap.panInsideBounds(bounds, { animate: false });
});

// for reverse location lookup
const opencageKey = config.OPENCAGEDATA_KEY;

// Vue integration
let app = new Vue({
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
// function that get's triggered when a marker is clicked
// responsible for updating the vue application with new marker information
function updateDescription(e) {


  for(let i=0;i<places.places.length;i++){
    if(places.places[i].name == e.target.customName){
      const found = places.places[i];

      //actually updating the vue data
      app.where = found.name;
      app.when = found.when;
      app.who = found.reason;
      app.activities = found.activities;

      break;
    }

  }

}



/**
 *  use the reverse location lookup to get the coordinates of the loc in geoJSON
 *    format
 *
 *  adds a marker to that returned lat and long with custom field `customName`
 *
 *  adds event listener for on click to `updateDescription()`
 */
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


/**
 *
 *  Saves the locations from the json to variable places
 *    upon saving, displays all the information onto the map
 *
 *
 */
let places;

getJSONContents().then(function(result) {
  places = result;

  for(let i=0;i<places.places.length;i++){
    console.log(places.places[i].name);

    createMarkerFromLocation(places.places[i].name).then(function(result){ console.log(result); });
  }

  // set the default location to be the first entry of the json
  app.where = places.places[0].name;
  app.when = places.places[0].when;
  app.who = places.places[0].reason;

  app.activities = places.places[0].activities;
});







/**
 *  function that will look at the pictures directory at the root
 *  of the project, and associate them with specific locations as
 *  mentioned by the user in the json
 *
 */
function getPictures(){




}
