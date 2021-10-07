
d3.json("/Resources/az_yelp_restaurants.json").then(createMap);


function createMap(data) {

    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });


    var baseMaps = {
        "Street Map": streetmap
    };

    var single_data = data;
    var restaurantMarkers = [];
    var rating1 = [];
    var rating2 = [];
    var rating3 = [];
    var rating4 = [];
    var rating5 = [];

    for (var index = 0; index < 10586; index++) {
        var restaurant = single_data[index];
        var ratings = single_data[index].stars;
        var restaurantMarker = L.marker([restaurant.latitude, restaurant.longitude])
            .bindPopup("<h3>" + restaurant.name + "<h3><h3>Address: " + restaurant.address + "</h3>");
        StarRating(ratings)
        function StarRating(star) {
            switch (true) {
        case star == 5:
            return rating5.push(L.marker([restaurant.latitude, restaurant.longitude])
            .bindPopup("<h3>" + restaurant.name + "<h3><h3>Address: " + restaurant.address + "</h3>"))
        case star >= 4:
            return rating4.push(L.marker([restaurant.latitude, restaurant.longitude])
            .bindPopup("<h3>" + restaurant.name + "<h3><h3>Address: " + restaurant.address + "</h3>"))
        case star >= 3:
            return rating3.push(L.marker([restaurant.latitude, restaurant.longitude])
            .bindPopup("<h3>" + restaurant.name + "<h3><h3>Address: " + restaurant.address + "</h3>"))
        case star >= 2:
            return rating2.push(L.marker([restaurant.latitude, restaurant.longitude])
            .bindPopup("<h3>" + restaurant.name + "<h3><h3>Address: " + restaurant.address + "</h3>"))
        default:
            return rating1.push(L.marker([restaurant.latitude, restaurant.longitude])
            .bindPopup("<h3>" + restaurant.name + "<h3><h3>Address: " + restaurant.address + "</h3>"))
    }
}
        restaurantMarkers.push(restaurantMarker);
    }
    var rating_1 = L.layerGroup(rating1);
    var rating_2 = L.layerGroup(rating2);
    var rating_3 = L.layerGroup(rating3);
    var rating_4 = L.layerGroup(rating4);
    var rating_5 = L.layerGroup(rating5);

    var overlayMaps = {
        "Rating 1": rating_1,
        "Rating 2": rating_2,
        "Rating 3": rating_3,
        "Rating 4": rating_4,
        "Rating 5": rating_5,
    };

    var map = L.map("map-restaurants", {
        center: [33.495003753458036, -111.71943620954704],
        zoom: 10,
        layers: [streetmap, rating_1]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
}
