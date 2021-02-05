// Creating the map for leaflet

// Colors the circles.
function circleColor(depth){
  var circcol
  if (depth < 70){
    circcol = "green";
  }
  else{
    circcol = "pink";
  };

  return circcol; 
};

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


  // Reading the geojsonfile
var geojson = d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',function(data){

  // To test the enrties for the geojson.
  var geoFeatures = data.features;

  // searches the coordinates of the geometry.
  for (var i = 0; i < geoFeatures.length; i++){
    var earthquake = geoFeatures[i];

    var latlng = [earthquake.geometry.coordinates[1],earthquake.geometry.coordinates[0]];
    var depth = earthquake.geometry.coordinates[2];
    var mag = earthquake.properties.mag;

    console.log(earthquake);
    L.circle(latlng,{
      color: "black",
      fillColor: circleColor(depth),
      radius: mag * 10
    }).bindPopup("This is a marker")
      .addTo(myMap)
  };
  // searches the geojson for the coordinates
  console.log("Eyy");

});
