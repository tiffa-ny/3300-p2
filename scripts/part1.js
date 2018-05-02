var USPricesGraph = d3.select("#usPrices");
var CanPricesGraph = d3.select("#canPrices");

//add lines to demarcate key dates in history
var line2 = USPricesGraph.append("line")
            .attr("x1", 387)
            .attr("y1", 50)
            .attr("x2", 387)
            .attr("y2", 550)
            .attr("stroke-width", 2.5)
            .attr("stroke", "#ccd9ff")
            .style('opacity', 0.5)
            .on('mouseover', function(d) {
              d3.select(this)
                .style('opacity', 1)
                .style('transition','opacity 300ms');
              USPricesGraph.append("text")
                .attr('x', 400)
                .attr('y', 70)
                .attr("id", 'rec')
                .text("Recession")
                .style('font-size', '14px');
            })
            .on('mouseout', function(d) {
              d3.select(this)
                .style('opacity', 0.5);
              d3.select("#rec").remove();
            });

var line3 = USPricesGraph.append("line")
          .attr("x1", 330)
          .attr("y1", 50)
          .attr("x2", 330)
          .attr("y2", 550)
          .attr("stroke-width", 2.5)
          .attr("stroke", "#ccd9ff")
          .style('opacity', 0.5)
          .on('mouseover', function(d) {
            d3.select(this)
              .style('opacity', 1)
              .style('transition','opacity 300ms');
            USPricesGraph.append("text")
              .attr('x', 95)
              .attr('y', 70)
              .attr("id", 'org')
              .text("Growing consumption of organic milk")
              .attr("font-size", "14px");
          })
          .on('mouseout', function(d) {
            d3.select(this)
              .style('opacity', 0.5);
            d3.select("#org").remove();
          });

var line4 = CanPricesGraph.append("line")
            .attr("x1", 387)
            .attr("y1", 50)
            .attr("x2", 387)
            .attr("y2", 550)
            .attr("stroke-width", 2.5)
            .attr("stroke", "#ffcccc")
            .style('opacity', 0.5)
            .on('mouseover', function(d) {
              d3.select(this)
                .style('opacity', 1)
                .style('transition','opacity 300ms');
              CanPricesGraph.append("text")
                .attr('x', 320)
                .attr('y', 70)
                .attr("id", 'rec')
                .text("Recession")
                .style('font-size', '14px');
            })
            .on('mouseout', function(d) {
              d3.select(this)
                .style('opacity', 0.5);
              d3.select("#rec").remove();
            });

var line5 = CanPricesGraph.append("line")
            .attr("x1", 245)
            .attr("y1", 50)
            .attr("x2", 245)
            .attr("y2", 550)
            .attr("stroke-width", 2.5)
            .attr("stroke", "#DF6971")
            .style('opacity', 0.5)
            .on('mouseover', function(d) {
              d3.select(this)
                .style('opacity', 1)
                .style('transition','opacity 300ms');
              CanPricesGraph.append("text")
                .attr('x', 67)
                .attr('y', 70)
                .attr("id", 'wto')
                .text("End of export milk subsidies")
                .attr("font-size", "14px");
            })
            .on('mouseout', function(d) {
              d3.select(this)
                .style('opacity', 0.5);
              d3.select("#wto").remove();
            });

//give format of dates
var dateParse = d3.timeParse("%m/%d/%Y");

function processing(row, index, columns) {
  //parse the dates as dates
  row.Date = dateParse(row.Date);
  return row;
}

function callback(err, data) {

  //consulted https://bl.ocks.org/mbostock/3884955 for whole thought process of how to slice up data and map it per item
  var items = data.columns.slice(1).map(function(item) {
    return {
      item: item,
      prices: data.map(function(attr) {
        return {
          Date: attr.Date,
          Price: Number(attr[item])
        };
      })
    };
  });

  //x scale and y scale, z scale for items
  var xScale1 = d3.scaleTime()
    .domain(d3.extent(data, d => d.Date))
    .range([50, 620]);

  var yScale1 = d3.scaleLinear()
    .domain([0, 9.3])
    .range([550, 50]);

  //colorscales to control the color of the lines
  var zScaleUS = d3.scaleOrdinal()
    .domain(items.map(function(items) {
      return items.items;
    }))
    .range(["#D5D5D5", "#D5D5D5", "#D5D5D5", "#D5D5D5", "#D5D5D5", "#D5D5D5", "#1974C4", "#D5D5D5", "#D5D5D5", "#D5D5D5", "#D5D5D5", "#D5D5D5", "#D5D5D5", "#D5D5D5", "#D5D5D5"]);

  var zScaleCAN = d3.scaleOrdinal()
    .domain(items.map(function(items) {
      return items.items;
    }))
    .range(["#D5D5D5", "#D5D5D5", "#D5D5D5", "#D5D5D5", "#D5D5D5", "#D5D5D5", "#C42619", "#D5D5D5", "#D5D5D5", "#D5D5D5", "#D5D5D5", "#D5D5D5", "#D5D5D5", "#D5D5D5", "#D5D5D5"]);

  //create the line, smooth the path with .curve
  var line = d3.line()
              .curve(d3.curveCardinal) 
              .x(d => xScale1(d.Date))
              .y(d => yScale1(d.Price));

  //US data 
  if (items[0].prices[0].Price == 3.003) {


    var item = USPricesGraph.append('g')
                            .selectAll('.item')
                            .data(items)
                            .enter().append("g")
                            .attr("class", "item")

    //add labels, but hide them for now
    var itemTexts = item.append("text")
                    .datum(function(d) {
                      return {
                        item: d.item,
                        price: d.prices[d.prices.length - 1]
                      };
                    })
                    .attr("transform", function(d) {
                      return "translate(" + xScale1(d.price.Date) + "," + yScale1(d.price.Price) + ")";
                    })
                    .attr("x", -150)
                    .attr("y", -50)
                    .style('opacity', 0)
                    .text(function(d) {
                      return d.item;
                    })
                    .attr('id', 'usPriceLabels');

    //add mouseover effect, consulted https://stackoverflow.com/questions/40556385/d3-how-can-i-show-hide-a-text-element-when-hovering-a-circle-element-created-f
    var itemLines = item.append("path")
                    .attr("class", "line")
                    .attr("d", function(d) {
                      return line(d.prices);
                    })
                    .style("stroke", function(d) {
                      return zScaleUS(d.item);
                    })
                    .style("fill", "none")
                    .on("mouseover", function(d) {
                      var textDisplay = itemTexts.filter(function(f) {
                        return f.item == d.item;
                      });
                      var itemDisplay = itemLines.filter(function(f) {
                        return f.item != d.item;
                      });
                      textDisplay.style('opacity', 1)
                      itemDisplay.style("opacity", 0.2);
                  })
                  .on("mouseout", function(d) {
                    var textDisplay = itemTexts.filter(function(f) {
                      return f.item == d.item;
                    });
                    var itemDisplay = itemLines.filter(function(f) {
                      return f.item != d.item;
                    });
                    textDisplay.style("opacity", 0)
                    itemLines.style("opacity", 1);
                  });

    //add axes
    USPricesGraph.append('g')
      .attr('transform', 'translate(0,550)')
      .call(d3.axisBottom(xScale1));

    USPricesGraph.append('g')
      .attr('transform', 'translate(50,0)')
      .call(d3.axisLeft(yScale1).tickFormat(d => '$' + d));

    //add text
    USPricesGraph.append('text')
      .attr('transform', 'rotate(270) translate(-350,20)')
      .attr('class', 'labels')
      .text("Price per Unit");

    USPricesGraph.append('text')
      .attr('transform', 'translate(50,30)')
      .attr('class', 'labels')
      .style('font-weight',800)
      .text("United States");

  //canada data
  } else {

    var item = CanPricesGraph.append('g')
                              .selectAll('.item')
                              .data(items)
                              .enter().append("g")
                              .attr("class", "item")
    
    //add text labels, but hide them with opacity 0
    var itemTexts = item.append("text")
                    .datum(function(d) {
                      return {
                        item: d.item,
                        price: d.prices[d.prices.length - 1]
                      };
                    })
                    .attr("transform", function(d) {
                      return "translate(" + xScale1(d.price.Date) + "," + yScale1(d.price.Price) + ")";
                    })
                    .attr("x", -150)
                    .attr("y", -55)
                    .style('opacity', 0)
                    .text(function(d) {
                      return d.item;
                    })
                    .attr('id', 'canPriceLabels');

    //add mouseover effect, consulted https://stackoverflow.com/questions/40556385/d3-how-can-i-show-hide-a-text-element-when-hovering-a-circle-element-created-f
    var itemLines = item.append("path")
                    .attr("class", "line")
                    .attr("d", function(d) {
                      return line(d.prices);
                    })
                    .style("stroke", function(d) {
                      return zScaleCAN(d.item);
                    })
                    .style("fill", "none")
                    .on("mouseover", function(d) {
                      var textDisplay = itemTexts.filter(function(f) {
                        return f.item == d.item;
                      });
                      var itemDisplay = itemLines.filter(function(f) {
                        return f.item != d.item;
                      });
                      textDisplay.style("opacity", 1)
                      itemDisplay.style("opacity", 0.2);
                    })
                    .on("mouseout", function(d) {
                      var textDisplay = itemTexts.filter(function(f) {
                        return f.item == d.item;
                      });
                      var itemDisplay = itemLines.filter(function(f) {
                        return f.item != d.item;
                      });
                      textDisplay.style("opacity", 0)
                      itemLines.style("opacity", 1);
                    });

    //add axes
    CanPricesGraph.append('g')
      .attr('transform', 'translate(0,550)')
      .call(d3.axisBottom(xScale1));

    CanPricesGraph.append('g')
      .attr('transform', 'translate(50,0)')
      .call(d3.axisLeft(yScale1).tickFormat(d => '$' + d));

    CanPricesGraph.append('text')
      .attr('transform', 'translate(50,30)')
      .attr('class', 'labels')
      .style('font-weight',800)
      .text("Canada");
  }
};

//run the functions
d3.csv("datasets/us.csv", processing, callback);
d3.csv("datasets/canada.csv", processing, callback);