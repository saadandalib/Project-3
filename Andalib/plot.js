let title = `Top Ten Restaurants by Review Counts`

let restaurants = ["Pizzeria Bianco", "Four Peaks Brewing", "Bobby Q", "Lux Central", "Rehab Burger Therapy", "Cibo", "La Santisima",
    "The Mission Old Town", "Joe's Farm Grill", "Citizen Public House"
]

let reviews = [2035, 1965, 1940, 1770, 1724, 1698, 1694, 1659, 1644, 1550]

let trace1 = {
    x: restaurants,
    y: reviews,
    type: 'bar'
};

let data = [trace1];

let layout = {
    title: title
};

Plotly.newPlot("plot", data, layout);