const file = "az_yelp_restaurants.json"

d3.json(file).then(function(data) {
    console.log(data)
    
    function createMarkers(data) {
        var single_data = data;
        var restaurantMarkers = [];

        for (var index = 0; index < 10586; index++) {
            var restaurant = single_data[index];

            var restaurantMarker = L.marker([restaurant.latitude,restaurant.longitude], {style: styleInfo})
                .bindPopup("<h3>" + restaurant.name + "</h3><h3>Address: " + restaurant.address + "</h3>" + "<br>Review Count: " +restaurant.review_count);
            };
                
            

            restaurantMarkers.push(restaurantMarker);
        }
        CreateMap(L.layerGroup(restaurantMarkers));
    },
    d3.json("az_yelp_restaurants.json").then(createMarkers);
    
    
    
    
    
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 0.7,
            color: chooseColor(restaurant.latitude, restaurant.longitude),
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
        }
    }
    // function createMarkers(markers) {
    //     var single_data = markers;
    //     var restaurantMarkers = [];

    //     for (var index = 0; index < 10586; index++) {
    //         var restaurant = single_data[index];
    //         var restaurantMarker = L.marker([restaurant.latitude, restaurant.longitude])
    //             .bindPopup("<h3>" + restaurant.name + "</h3><h3>Address: " + restaurant.address + "</h3>" + "<br>Review Count: " +restaurant.review_count);
            
    //         restaurantMarkers.push(restaurantMarker);
    //     }
    // }
    var reviews = L.geoJson(data, {
        function(feature,latlng) {
            return L.Marker(latlng);
        },
        style: styleInfo,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>" + restaurant.name + "</h3><h3>Address: " + restaurant.address + "</h3>" + "<br>Review Count: " +restaurant.review_count);
        }
    });

    createMap(reviews);


    function createMap(reviews) {
        var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });
        var baseMaps = {
            "Street Map": streetmap
        };
        var overlayMaps = {
            "Restaurants": reviews
        };
        var map = L.map("map-restaurants", {
            center: [34.495003753458036, -111.71943620954704],
            zoom: 8,
            layers: [streetmap, reviews]
        });
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(map);

    }

//     var starRatings = L.layerGroup().add(map);
//     var starLayers = { "Star Ratings":starRatings};

//     for (var star in stars) {
//         var starLayer = L.geoJson(data, {
//             filter: function(feat) {
//                 return feat.restaurant.stars === star;
//             }
//         });
//         starRatings.addLayer(starLayer);
//     }
//     L.control.layers(starLayers).addTo(map)
});