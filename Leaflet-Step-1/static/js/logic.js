// Creating the map for leaflet

// Colors the circles based on depth.
function circleColor(depth){
  if (depth < 10){
    return "#99ff99";
  }
  else if (depth < 30){
    return "#66ff66"
  }
  else if (depth < 50){
    return "#33cc33"
  }
  else if (depth < 70){
    return "#009933"
  }
  else{
    return "#003300";
  };
};

// Creates the map for the leaflet
var myMap = L.map("map",{
    center: [38.8003, -102.6216],
    zoom: 3
});

// Creates the legend and positions it.
var legend = L.control({position: "bottomright"});

// The legend itself.
legend.onAdd = function (myMap) {
  
  // Creates a div called .info.legend.
  var div = L.DomUtil.create('div', 'info legend'),
  
  // Creates the bins.
  grades = [-10, 10, 30, 50, 70],
  labels = [];
  
  // Creates the title
  var legendTitle = "<h5> Earthquake Magnitudes </h5>";

  // Adds the title to the div.
  div.innerHTML = legendTitle;

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {

      // Will add the rest of the legend to the div
      div.innerHTML +=
          '<i style="background-color: ' + circleColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }
  return div;
};

// Adds the legend to the map.
legend.addTo(myMap);

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

    // Creates variables that hold properties from the geojson
    var latlng = [earthquake.geometry.coordinates[1],earthquake.geometry.coordinates[0]];
    var depth = earthquake.geometry.coordinates[2];
    var mag = earthquake.properties.mag;
    var location = earthquake.properties.place;

    // Creates the markers for each earthquake.
    L.circleMarker(latlng,{
      color: "black",
      fillColor: circleColor(depth),
      fillOpacity: 1,
      radius: mag * 3,
      // Binds a pop up to the markers.
    }).bindPopup(`<strong>Location:</strong> ${location} <br> <strong>Magnitude:</strong> ${mag} 
    <br> <strong>Depth: </strong> ${depth} km`)
      .addTo(myMap)
  };
  
  // shows if the code had finished running.
  console.log("done");
});
