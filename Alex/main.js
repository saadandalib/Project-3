function createMap(restaurants) {
    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    var baseMaps = {
        "Street Map": streetmap
    };
    var overlayMaps = {
        "Restaurants": restaurants
    };
    var map = L.map("map-restaurants", {
        center: [34.495003753458036, -111.71943620954704],
        zoom: 8,
        layers: [streetmap, restaurants]
    });
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
}

function createMarkers(data) {
    var single_data = data;
    var restaurantMarkers = [];
    console.log(data);
    for (var index = 0; index < 10586; index++) {
        var restaurant = single_data[index];
        function styleInfo(feature) {
            return {
                opacity: 1,
                fillOpacity: 0.7,
                fillColor: chooseColor(feature.restaurant.review_count),
                color: "#000000",
                stroke: true,
                weight: 0.5
            };
        }
        function chooseColor(count) {
            switch (true) {
                case count > 200:
                    return "green";
                case count > 150:
                    return "lightgreen";
                case count > 100:
                    return "yellow";
                case count > 50:
                    return "orange";
                default:
                    return "red";
            };
        }
        var restaurantMarker = L.marker([restaurant.latitude, restaurant.longitude], {style: styleInfo})
            .bindPopup("<h3>" + restaurant.name + "<h3><h3>Address: " + restaurant.address + "</h3>" + "<h3>Review Count: " + restaurant.review_count + "</h3>");

        restaurantMarkers.push(restaurantMarker);
    }
    createMap(L.layerGroup(restaurantMarkers));
}
d3.json("az_yelp_restaurants.json").then(createMarkers);


// function styleInfo(feature) {
//     return {
//         opacity: 1,
//         fillOpacity: 0.7,
//         color: chooseColor(feature.restaurant.review_count),
//         stroke: true,
//         weight: 0.5
//     };
// }

// function chooseColor(count) {
//     switch (true) {
//         case count > 200:
//             return "green";
//         case count > 150:
//             return "lightgreen";
//         case count > 100:
//             return "yellow";
//         case count > 50:
//             return "orange";
//         default:
//             return "red";
//     }
// }

    // var starRatings = L.layerGroup().add(map);
    // var starLayers = { "Star Ratings":starRatings};

    // for (var star in stars) {
    //     var starLayer = L.geoJson(data, {
    //         filter: function(feat) {
    //             return feat.restaurant.stars === star;
    //         }
    //     });
    //     starRatings.addLayer(starLayer);
    // }
    // L.control.layers(starLayers).addTo(map)