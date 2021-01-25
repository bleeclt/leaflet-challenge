// json variable
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL 
d3.json(url, function(data) {
    // console.log(data.features);

    // function defined later for creating features from data
    createFeatures(data.features);
});

// function for color based on magnitude
function getColor(mag) {
    switch (true) {
        case mag > 90:
          return "red";
        case mag > 70:
          return "orange";
        case mag > 50:
          return "yellow";
        case mag > 30:
          return "chartreuse";
        case mag > 10:
          return "lime";
        default:
          return "green";
      }
};

function createFeatures(earthquakeData) {

    // Popup for the place and time of the earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
            "</h3><hr><p><b>Time:</b> " + new Date(feature.properties.time) + "</p>" +
            "<p><b>Magnitude:</b> " + feature.properties.mag + "</p>");
    }

    function pointToLayer(feature, latlng) {
        var markerOptions = {
            radius: feature.properties.mag * 4,
            fillColor: getColor(feature.properties.mag),
            color: "grey",
            weight: 0.5,
            opacity: 1,
            fillOpacity: 0.75
        }

        return L.circleMarker(latlng, markerOptions)
    }

    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: pointToLayer,
    });

    // Earthquakes layer
    createMap(earthquakes);
};

function createMap(earthquakes) {

    // define streetmap and darkmap layers
    var lightmap = L.titleLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 516,
        minZoom: 2,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/light-v10",
        accessToken: API_KEY
    });
}

    