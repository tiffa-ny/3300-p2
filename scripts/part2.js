var margin = {top: 50, right: 40, bottom: 25, left: 40};
var width = 1200 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var yScale = d3.scaleLinear()
                .range([height,0]);

var yScaleTop = d3.scaleLinear()
                  .range([(yScale(0) -160), (yScale(0)-height)-30]);

var yScaleBottom = d3.scaleLinear()
                     .range([(0+ yScale(0) -30), height -90]);

var xScale = d3.scaleBand()
                .rangeRound([0, width])
                .paddingInner(0.1);

var div = d3.select("#part2").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

d3.csv("datasets/percentChange.csv", makePositive, function(error, data) {

  //x is percent change because will be vertical bar graph
  //nice because is long decimal
  yScale.domain(d3.extent(data, function(d){
          return d.percentChange;
        })).nice();
  xScale.domain(data.map(function(d){
    return d.itemName;
  }));

  yScaleTop.domain([0, 1.6]);
  yScaleBottom.domain([-.223, 0]);

  //So we dont need to alter the x-tick marks later
  var displayPercentage = d3.format("1.0%");

  var yAxisTop = d3.axisLeft()
                  .scale(yScaleTop)
                  .tickFormat(displayPercentage);

  var yAxisBottom = d3.axisLeft()
                    .scale(yScaleBottom)
                    .ticks(4).tickFormat(displayPercentage);

  var percentageGraph = d3.select("#comparing-percentages")
                          .append("g")
                          .attr("transform","translate("+margin.left+","+margin.top+")");

  var barLines = percentageGraph.selectAll(".bar")
                  .data(data)
                  .enter()
                  .append("rect")
                    //Setting CSS name for styling colors
                  .attr("class",function(d){return "bar bar_"+(d.percentChange<0 ? "negative":"positive"); })
                  .attr("x",function(d){return xScale(d.itemName);})
                  .attr("y",function(d){
                    if(d.percentChange > 0 ){
                      return yScale(Math.max(0,d.percentChange))-30;
                    }
                    else if (d.percentChange < 0){
                      return yScale(Math.max(0,d.percentChange))+30;
                    }
                  })
                  //Consulted https://github.com/d3/d3-scale for width/height
                  .attr("width",xScale.bandwidth())
                  //Returns width of each band
                  .attr("height",function(d){
                      return Math.abs(yScale(d.percentChange)-yScale(0));
                  })
                  //tooltip used to give information on the certain bar while greying out the rest of them
                  .on("mouseover", function(d) {
                    var itemDisplay = barLines.filter(function(f) {
                        return f.itemName != d.itemName;
                    });
                    itemDisplay.style("opacity",0.2)
                                .style('transition','opacity 400ms');
                    div.transition()
                       .duration(200)
                        .style("opacity", 1.0);

                    //Function used to display dollar sign in the tooltip
                     /* Consulted: https://bl.ocks.org/stevenwmarks/c23bf3940bc5f1ee4027ccc72097a03b
                      for formatting here */
                    div.html("Canadian Price: $" + d3.format(",.2f")(d.canadaPrice)+"<br/>"+
                           "U.S. Price: $" + d3.format(",.2f")(d.usPrice)+"<br/>"+
                           "Net Change: $" + d3.format(",.2f")(d.netChange)+"<br/>"+
                           "<b>Percent Change: " + d3.format("1.0%")(d.percentChange)+"</b><br/>")
                      .style("left",(d3.event.pageX)+"px")
                      .style("top",(d3.event.pageY - 28)+"px");
                  })
                  //Get rid of tooltip
                  .on("mouseout", function(d){
                    var itemDisplay = barLines.filter(function(f) {
                        return f.itemName != d.itemName;
                    })
                    itemDisplay.style("opacity",1)

                    div.transition()
                          .duration(500)
                          .style("opacity", 0);
                  });

//add text
percentageGraph.append('text')
    .attr('transform','rotate(270) translate(-400,-15)')
    .attr('class','labels')
    .text("Price Difference (%)");

/* Consulted: https://bl.ocks.org/stevenwmarks/c23bf3940bc5f1ee4027ccc72097a03b */
 var textArray = ['Milk','Chicken','Flour','Eggs','Ground Beef','Pork Chops', 'Bread','Apples','Steak', 'Bananas','Cheese','Macaroni','Bacon','Potatoes','Sugar'];

var myImages = percentageGraph.append("g")
              .selectAll('image')
              .data([
                "images/milk.png",
                "images/chicken.png",
                "images/flour.png",
                "images/eggs.png",
                "images/beef.png",
                "images/pork.png",
                "images/bread.png",
                "images/apple.png",
                "images/steak.png",
                "images/banana.png",
                "images/cheese.png",
                "images/macaroni.png",
                "images/bacon.png",
                "images/potatoes.png",
                "images/sugar.png"])
              .enter().append('image')
              .attr("xlink:href", function(d){
                return d;
              })
              .attr("width", 55)
              .attr("height", 55)
              .style('opacity',1)
              .data([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14])
              .attr('x', function(d){return (d*75)+10})
              .attr('y', yScale(0) -27)
              .on('mouseover',function(d) {
                d3.select(this)
                  .style('opacity',0.2)
                  .style('transition','opacity 400ms');
                percentageGraph.append('text')
                  .attr('x',(d*75)+36)
                  .attr('y',yScale(0)+3)
                  .attr('width',55)
                  .attr('height',55)
                  .style('text-anchor','middle')
                  .attr('id','textName'+d)
                  .text(textArray[d]);
              })
              .on('mouseout',function(d) {
                d3.select(this)
                  .style('opacity',1);
                d3.select('#textName'+d).remove();
              });
            });

function makePositive(d) {
  d.percentChange = +d.percentChange;
  return d;
}