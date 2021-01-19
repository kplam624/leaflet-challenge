// Creating the map for leaflet

var myMap = L.map("map",{
    center: [40.73, -74.0059],
    zoom: 4
});

// Tile layer for the map.
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  // Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
  // for (var i = 0; i < cities.length; i++) {
  //   var city = cities[i];
  //   L.marker(city.location)
  //     .bindPopup("<h1>" + city.name + "</h1> <hr> <h3>Population " + city.population + "</h3>")
  //     .addTo(myMap);
  // }

var latLng = [];
var mag = []

  // Reading the geojsonfile
var geojson = d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',function(data){
  console.log(data);

  // To test the enrties for the geojson.
  var geoFeatures = data.features;

  // searches the coordinates of the geometry.
  for (var i = 0; i < 10; i++){
    var earthquake = geoFeatures[i];

    var latlng = [earthquake.geometry.coordinates[0],earthquake.geometry.coordinates[1]];
    var depth = earthquake.geometry.coordinates[2];
    console.log(latlng);
    console.log(depth);
  };
  // searches the geojson for the coordinates
  console.log("Eyy");

  // Using geojson for the pointer creation.
  // Will be using the point to layer function.


});
