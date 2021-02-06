// Creating the map for leaflet

// Colors the circles based on depth.
function circleColor(depth){
  var circcol
  if (depth < 10){
    circcol = "#003300";
  }
  else if (depth < 30){
    circcol = "#009900"
  }
  else if (depth < 50){
    circcol = "#99ff33"
  }
  else if (depth < 70){
    circcol = "#ff0000"
  }
  else{
    circcol = "#800000";
  };

  return circcol; 
};

var myMap = L.map("map",{
    center: [38.8003, -102.6216],
    zoom: 3
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
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson',function(data){

  // To test the enrties for the geojson.
  var geoFeatures = data.features;

  // searches the coordinates of the geometry.
  for (var i = 0; i < geoFeatures.length; i++){
    var earthquake = geoFeatures[i];

    var latlng = [earthquake.geometry.coordinates[1],earthquake.geometry.coordinates[0]];
    var depth = earthquake.geometry.coordinates[2];
    var mag = earthquake.properties.mag;
    var location = earthquake.properties.place;

    console.log(earthquake);

    L.circleMarker(latlng,{
      color: "black",
      fillColor: circleColor(depth),
      fillOpacity: 1,
      radius: mag * 3,
    }).bindPopup(`<strong>Location:</strong> ${location} <br> <strong>Magnitude:</strong> ${mag} 
    <br> <strong>Depth: </strong> ${depth} km`)
      .addTo(myMap)
  };
  // searches the geojson for the coordinates
  console.log("Eyy");

});
