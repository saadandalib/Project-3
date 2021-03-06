var svg = d3.select("svg"),
        margin =200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;

    svg.append("text")
       .attr("transform", "translate(10,0)")
       .attr("text-anchor", "middle") 
       .attr("x", (width /1.58))
       .attr("y", 60)
       .style("font-size", "26px")
       .attr("stroke", "black")
       .text("Star ratings on restaurants of Cities in AZ");

    //    Set Ranges
    var x = d3.scaleBand().range([0, width]).padding(0.4),
        y = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

 
    // Get Data
    d3.csv("az_yelp_restaurants.csv", function(error, data) {
        if (error) {
            throw error;
        }
    
        
 // Scale the range of the data in the domains
        x.domain(data.map(function(d) { return d.city; }));
        y.domain([0, d3.max(data, function(d) { return d.stars; })]);
        d3.mean
        // Add x axis
     g.append("g")
      .attr("class", "x axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-90)" );

   
         // Add the text label for the x axis
       g.append("text")
        .attr("transform", "translate(" + (width /2)+"," + (height +100)+ ")")
        .style("text-anchor", "middle")
        .attr("stroke", "black")
        .text("Cities in AZ");

        g.append("g")
         .call(d3.axisLeft(y).tickFormat(function(d){
             return  d;
         }).ticks(10))
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 10)
         .attr("x",10 - (height/2))
         .attr("dy", "-5.1em")
         .attr("text-anchor", "middle")
         .attr("stroke", "black")
         .text("Star Ratings");

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .on("mouseover", onMouseOver) //Add listener for the mouseover event
         .on("mouseout", onMouseOut)   //Add listener for the mouseout event
         .attr("x", function(d) { return x(d.city); })
         .attr("y", function(d) { return y(d.stars); })
         .attr("width", x.bandwidth())
         .transition()
         .ease(d3.easeLinear)
         .duration(400)
        //  .delay(function (d, i) {
        //      return i * 50;
        //  })
         .attr("height", function(d) { return height - y(d.stars); });
    });

    //mouseover event handler function
    function onMouseOver(d, i) {
        d3.select(this).attr('class', 'highlight');
        d3.select(this)
          .transition()     // adds animation
          .duration(400)
          .attr('width', x.bandwidth() + 5)
          .attr("y", function(d) { return y(d.stars) - 10; })
          .attr("height", function(d) { return height - y(d.stars) + 10; });

        g.append("text")
         .attr('class', 'val') 
         .attr('x', function() {
             return x(d.city);
         })
         .attr('y', function() {
             return y(d.stars) - 15;
         })
         .text(function() {
             return [ d.stars];  // Value of the text
         });
    }

    //mouseout event handler function
    function onMouseOut(d, i) {
        // use the text label class to remove label on mouseout
        d3.select(this).attr('class', 'bar');
        d3.select(this)
          .transition()     // adds animation
          .duration(400)
          .attr('width', x.bandwidth())
          .attr("y", function(d) { return y(d.stars); })
          .attr("height", function(d) { return height - y(d.stars); });

        d3.selectAll('.val')
          .remove()
    };