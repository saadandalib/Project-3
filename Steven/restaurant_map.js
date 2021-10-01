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

    for (var index = 0; index < 10586; index++) {
        var restaurant = single_data[index];

        var restaurantMarker = L.marker([restaurant.latitude, restaurant.longitude])
            .bindPopup("<h3>" + restaurant.name + "<h3><h3>Address: " + restaurant.address + "</h3>");

        restaurantMarkers.push(restaurantMarker);
    }
    createMap(L.layerGroup(restaurantMarkers));
}

d3.json("/Resources/az_yelp_restaurants.json").then(createMarkers);

