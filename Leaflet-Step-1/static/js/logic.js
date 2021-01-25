// json variable
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL 
d3.json(url, function(data) {
    // console.log(data.features);

    // function defined later for creating features from data
    createFeatures(data.features);
});


    