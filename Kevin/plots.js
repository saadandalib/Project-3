// Use d3 to read the JSON file.
// The data from the JSON file is arbitrarily named importedData as the argument.
d3.json("az_yelp_restaurants.json", function (error, importedData)  {
    console.log(importedData);
    var data = importedData;
    y= [1, 2, 3, 4, 5]


// names = data.map(function (row){
//     return row.city
//   });
  

    // Trace1 for the Greek data.
    var trace1 = {
      x: data.map(row => row.city),
      y: data.map(row => row.stars),
      // text: data.map(row => row.stars),
      
      type: "bar",
    //   orientation: "h"
    };
  
    // Data
    var chartData = [trace1];
  
    // Apply the group bar mode to the layout.
    var layout = {
      title: "Star ratings of restaurants in cities of AZ",
      xaxis: {title: 'Cities in AZ',
      },
      yaxis: {
        
        title: 'Star Ratings',
        
    // autorange: true,
    //  },
    //   autosize: false,
    //   width: 1000,
    //   height: 800,
    //   margin: {
    //     l: 50,
    //     r: 50,
    //     b: 200,
    //     t: 200,
    //     pad: 4
    //   },
      
    }};
  
    // Render the plot to the div tag with the id of "plot".
    Plotly.newPlot("plotk", chartData, layout);
  });