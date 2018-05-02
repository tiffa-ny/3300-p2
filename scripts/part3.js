//functions to toggle graphs between price and time
function toggleProfit() {
    if (document.getElementById('profitToggle').checked) {
        d3.selectAll('.profitTime')
          .style('visibility','hidden')
          .style('opacity',0)
          .style('transition', 'visibility 0s linear 400ms, opacity 500ms');
        d3.selectAll('.profitPrice')
            .style('visibility','visible')
            .style('opacity',1)
            .style('transition', 'visibility 0s linear 400ms, opacity 500ms');
    } else {
        d3.selectAll('.profitTime')
          .style('visibility','visible')
          .style('opacity',1)
          .style('transition', 'visibility 0s linear 400ms, opacity 500ms');
        d3.selectAll('.profitPrice')
            .style('visibility','hidden')
            .style('opacity',0)
            .style('transition', 'visibility 0s linear 400ms, opacity 500ms');
    };
    };

function toggleCost() {
    if (document.getElementById('costToggle').checked) {
        d3.selectAll('.costTime')
          .style('visibility','hidden')
          .style('opacity',0)
          .style('transition', 'visibility 0s linear 300ms, opacity 400ms');
        d3.selectAll('.costPrice')
            .style('visibility','visible')
            .style('opacity',1)
            .style('transition', 'visibility 0s linear 300ms, opacity 400ms');
    } else {
        d3.selectAll('.costTime')
          .style('visibility','visible')
          .style('opacity',0.7)
          .style('transition', 'visibility 0s linear 300ms, opacity 400ms');
        d3.selectAll('.costPrice')
          .style('visibility','hidden')
          .style('opacity',0)
          .style('transition', 'visibility 0s linear 300ms, opacity 400ms');
    };
};

function toggleProduction() {
    if (document.getElementById('productionToggle').checked) {
        d3.selectAll('.productionTime')
          .style('visibility','hidden')
          .style('opacity',0)
          .style('transition', 'visibility 0s linear 300ms, opacity 400ms');
        d3.selectAll('.productionPrice')
            .style('visibility','visible')
            .style('opacity',1)
            .style('transition', 'visibility 0s linear 300ms, opacity 400ms');
    } else {
        d3.selectAll('.productionTime')
          .style('visibility','visible')
          .style('opacity',1)
          .style('transition', 'visibility 0s linear 300ms, opacity 400ms');
        d3.selectAll('.productionPrice')
          .style('visibility','hidden')
          .style('opacity',0)
          .style('transition', 'visibility 0s linear 300ms, opacity 400ms');
    };
};

//creation of graphs
var profitGraph = d3.select("#comparing-profits")
                    .attr("width",1000)
                    .attr("height",500);

var usCostGraph = d3.select('#us-comparing-costs')
                .attr('width',600)
                .attr('height',500);

var canadaCostGraph = d3.select('#canada-comparing-costs')
                .attr('width',600)
                .attr('height',500);

var productionGraph = d3.select("#comparing-production")
                        .attr('width',1000)
                        .attr('height',550);

var bonusGraph1 = d3.select("#bonus1")
                    .attr('width',700)
                    .attr('height',525);

var bonusGraph2 = d3.select("#bonus2")
                    .attr('width',550)
                    .attr('height',525);

//loading the data
var queue = d3.queue()
                .defer(d3.csv, 'datasets/us-farms-income.csv')
                .defer(d3.csv, 'datasets/canada-farms-income.csv');

queue.awaitAll(function(error, data) {
    
    if (error) throw error;
    
    var usData = data[0];
    var canadaData = data[1];

    var usArray = [];
    var canadaArray = [];

    //processing the data as arrays
    for (i=0;i<canadaData.length;i++) {
        usArray[i] = {
            Year: Number(usData[i]["Year"]),
            Price: Number(usData[i]["Price"]),
            CapitaProduction: Number(usData[i]["Production per capita"]),
            FarmProduction: Number(usData[i]['Production per farm']),
            FarmNumber: Number(usData[i]['Number of Farms']),
            Revenue: Number(usData[i]['Revenue per gallon']),
            Cost: Number(usData[i]['Cost per gallon']),
            Profit: Number(usData[i]['Profit per gallon'])
        };
    };

    for (j=0;j<canadaData.length;j++) {
        canadaArray[j] = {
            Year: Number(canadaData[j]["Year"]),
            Price: Number(canadaData[j]["Price"]),
            CapitaProduction: Number(canadaData[j]["Production per capita"]),
            FarmProduction: Number(canadaData[j]['Production per farm']),
            FarmNumber: Number(canadaData[j]['Number of Farms']),
            Revenue: Number(canadaData[j]['Revenue per gallon']),
            Cost: Number(canadaData[j]['Cost per gallon']),
            Profit: Number(canadaData[j]["Profits/gallon"])
        };
    };

    //PROFIT GRAPHS -- YEAR AND PRICE /////////////////////////
    var profitTimeXScale = d3.scaleLinear()
                    .domain([2000,2014])
                    .range([50,940]);
    var profitYScale = d3.scaleLinear()
                    .domain([0.9, -0.2])
                    .range([10,450]);

    var usProfitLine = d3.area()
                .x(d => profitTimeXScale(d.Year))
                .y(d => profitYScale(d.Profit));

    //appending paths to profit graph over time
    profitGraph.append("path")
        .attr("d",usProfitLine(usArray))
        .attr('id','usTimePath')
        .attr('class','profitTime')
        .style("stroke","#0C408E");

    profitGraph.append("path")
        .attr("d",usProfitLine(canadaArray))
        .attr('id','canadaTimePath')
        .attr('class','profitTime')
        .style("stroke","red");

    //adding elements to highlight negative profit
    profitGraph.append('rect')
                .attr('id','negativeProfit')
                .attr('x',50)
                .attr('y',370)
                .attr('height',80)
                .attr('width',890)
                .style('fill','grey')
                .style('opacity',0.2)

    profitGraph.append('text')
                .attr('id','negativeProfitLabel')
                .attr('x',100)
                .attr('y',415)
                .text('Negative Profits!')
                .style('font-size','14px');

    //filling circles with images code from https://groups.google.com/forum/#!topic/d3-js/1P5IphE319g
    var circleFill = profitGraph.append('svg:defs');
    circleFill.append('svg:pattern')
                    .attr('id', 'us-icon')
                    .attr('width', '20')
                    .attr('height', '20')
                .append('svg:image')
                .attr('xlink:href', 'images/us-icon.png')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', 20)
                .attr('height', 20);
    circleFill.append('svg:pattern')
                    .attr('id', 'us-icon-big')
                    .attr('width', '28')
                    .attr('height', '28')
                .append('svg:image')
                .attr('xlink:href', 'images/us-icon.png')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', 28)
                .attr('height', 28);
    circleFill.append('svg:pattern')
                    .attr('id', 'canada-icon')
                    .attr('width', '20')
                    .attr('height', '20')
                .append('svg:image')
                .attr('xlink:href', 'images/canada-icon.png')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', 20)
                .attr('height', 20);
    circleFill.append('svg:pattern')
                    .attr('id', 'canada-icon-big')
                    .attr('width', '28')
                    .attr('height', '28')
                .append('svg:image')
                .attr('xlink:href', 'images/canada-icon.png')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', 28)
                .attr('height', 28);

    //append circles on profit graph over time for united states and canada
    profitGraph.append("g")
        .attr("class", "usTimeCircles profitTime")
        .selectAll("circle")
        .data(usArray)
        .enter().append("circle")
        .attr('opacity',0.7)
        .attr('fill','url(#us-icon)')
        .attr("r", 10)
        .attr("cx", function(d) {return profitTimeXScale(d.Year); })
        .attr("cy", function(d) {return profitYScale(d.Profit); })
        .on("mouseover",function(d){
            d3.select(this)
                .attr('r',14)
                .attr('opacity',1)
                .attr('fill','url(#us-icon-big)')
                .style('transition','opacity 1000ms');
            profitGraph.append("text")
                        .attr('x',function() {return profitTimeXScale(d.Year)+20; })
                        .attr('y',function() {return profitYScale(d.Profit)+5; })
                        .attr('id','a'+d.Year)
                        .text(function() { return "$"+d.Profit.toFixed(2); });
            profitGraph.select('#usTimePath')
                       .style('stroke-opacity',1)
                       .style('transition','linear 300ms, opacity 300ms');
            profitGraph.select('#canadaTimePath')
                        .style('stroke-opacity',0.1)
                        .style('transition','linear 300ms, opacity 300ms');
            profitGraph.select('.canadaTimeCircles')
                        .style('opacity',0.2)
                        .style('transition','linear 800ms, opacity 800ms');
        })
        .on("mouseout",function(d) {
            d3.select(this)
                .attr('r',10)
                .attr('opacity',0.7)
                .attr('fill','url(#us-icon)');
            d3.select("#a"+d.Year).remove();
            profitGraph.select('#usTimePath')
                       .style('stroke-opacity',0.4);
            profitGraph.select('#canadaTimePath')
                        .style('stroke-opacity',0.4);
            profitGraph.select('.canadaTimeCircles')
                        .style('opacity',1);
        });

    profitGraph.append("g")
        .attr("class", "canadaTimeCircles profitTime")
        .selectAll("circle")
        .data(canadaArray)
        .enter().append("circle")
        .attr('fill','url(#canada-icon)')
        .attr('r', 10)
        .attr('opacity',0.7)
        .attr("cx", function(d) {return profitTimeXScale(d.Year); })
        .attr("cy", function(d) {return profitYScale(d.Profit); })
        .on("mouseover",function(d){
            d3.select(this)
                .attr('r',14)
                .attr('opacity',1)
                .attr('fill','url(#canada-icon-big)')
                .style('transition','opacity 1000ms');
            profitGraph.append("text")
                        .attr('x',function() {return profitTimeXScale(d.Year)-30; })
                        .attr('y',function() {return profitYScale(d.Profit)-15; })
                        .attr('id','a'+d.Year)
                        .text(function() { return "$"+d.Profit.toFixed(2); });
            profitGraph.select('#canadaTimePath')
                       .style('stroke-opacity',1)
                       .style('transition','linear 300ms, opacity 300ms');
            profitGraph.select('#usTimePath')
                        .style('stroke-opacity',0.1)
                        .style('transition','linear 300ms, opacity 300ms');
            profitGraph.select('.usTimeCircles')
                        .style('opacity',0.1)
                        .style('transition','linear 800ms, opacity 800ms');
        })
        .on("mouseout",function(d) {
            d3.select(this)
                .attr('r',10)
                .attr('opacity',0.7)
                .attr('fill','url(#canada-icon)');
            d3.select("#a"+d.Year).remove();
            profitGraph.select('#canadaTimePath')
                       .style('stroke-opacity',0.4);
            profitGraph.select('#usTimePath')
                        .style('stroke-opacity',0.4);
            profitGraph.select('.usTimeCircles')
                        .style('opacity',null);
        });

    //add axes
    profitGraph.append('g')
               .attr('transform','translate(0,450)')
               .attr('class','profitTime')
               .call(d3.axisBottom(profitTimeXScale).tickFormat(d3.format("d")));

    profitGraph.append('g')
               .attr('transform','translate(50,0)')
               .call(d3.axisLeft(profitYScale).tickFormat(d=>'$'+d));

    //add text
    profitGraph.append('text')
        .attr('transform','rotate(270) translate(-290,12)')
        .attr('class','labels')
        .text("Profit per gallon");

    //add scale for profit over price graph 
    var profitPriceXScale = d3.scaleLinear()
                        .domain([2.5,9.5])
                        .range([50,940]);

    //add circles for profit over price graphs
    profitGraph.append('g')
        .attr('class','usPriceCircles profitPrice')
        .selectAll("circle")
        .data(usArray)
        .enter().append("circle")
        .attr('r',5)
        .attr('cx',function(d) {return profitPriceXScale(d.Price); })
        .attr('cy',function(d) {return profitYScale(d.Profit); })
        .on("mouseover",function(d) {
            d3.select('.canadaPriceCircles')
                .style('opacity',0.2);
            d3.select(this)
                .style('fill','#71B4D8')
                .attr('r',7)
                .style('transition','linear 300ms, opacity 300ms');

            profitGraph.append("text")
                        .attr('x',function() { return profitPriceXScale(d.Price)+10; })
                        .attr('y',function() {return profitYScale(d.Profit)+5; })
                        .attr('id','i'+d.Year)
                        .text(function() { return "$"+d.Price.toFixed(2); });
        })
        .on("mouseout",function(d) {
            d3.select('.canadaPriceCircles')
                .style('opacity',1);
            d3.select(this)
                .style('fill','#0C408E')
                .attr('r',5);
            d3.select("#i"+d.Year).remove();
        });

    profitGraph.append('g')
        .attr('class','canadaPriceCircles profitPrice')
        .selectAll("circle")
        .data(canadaArray)
        .enter().append("circle")
        .attr('r',5)
        .attr('cx',function(d) {return profitPriceXScale(d.Price); })
        .attr('cy',function(d) {return profitYScale(d.Profit); })
        .on("mouseover",function(d) {
            d3.select('.usPriceCircles')
                .style('opacity',0.2);
            d3.select(this)
                .style('fill','#FF9168')
                .attr('r',7)
                .style('transition','linear 300ms, opacity 300ms');

            profitGraph.append("text")
                        .attr('x',function() { return profitPriceXScale(d.Price); })
                        .attr('y',function() {return profitYScale(d.Profit)-10; })
                        .attr('id','i'+d.Year)
                        .text(function() { return "$"+d.Price.toFixed(2); });
        })
        .on("mouseout",function(d) {
            d3.select('.usPriceCircles')
                .style('opacity',1);
            d3.select(this)
                .style('fill','#E1202C')
                .attr('r',5);
            d3.select("#i"+d.Year).remove();
        });

    //add axes, consulted https://stackoverflow.com/questions/18474620/d3-js-tickformat-adding-a-sign-without-multiplying-by-100 for format
    profitGraph.append('g')
               .attr('transform','translate(0,450)')
               .attr('class','profitPrice')
               .call(d3.axisBottom(profitPriceXScale).tickFormat(d => '$'+d));

    profitGraph.append('text')
        .attr('class','labels profitPrice')
        .attr('transform','translate(480,490)')
        .text("Price per gallon");

    //COST GRAPHS -- YEAR AND PRICE /////////////////////////////////
    var usCostTimeXScale = d3.scaleLinear()
                        .domain([2000,2014])
                        .range([50,580])

    var revenueYScale = d3.scaleLinear()
                    .domain([3.8,0])
                    .range([10,450]);

    //set area fills and lines
    var costArea = d3.area() 
                    .x(d => usCostTimeXScale(d.Year))
                    .y0(450)
                    .y1(d => revenueYScale(d.Cost));

    var costLine = d3.line() 
                    .x(d => usCostTimeXScale(d.Year))
                    .y(d => revenueYScale(d.Cost));

    var revenueArea = d3.area()
                        .x(d => usCostTimeXScale(d.Year))
                        .y0(450)
                        .y1(d => revenueYScale(d.Revenue));

    var revenueLine = d3.line() 
                    .x(d => usCostTimeXScale(d.Year))
                    .y(d => revenueYScale(d.Revenue));

    //adapted from https://bl.ocks.org/mbostock/3902569, tracks mouse as you hover
    var usHover = usCostGraph.append("g")
                  .attr("class", "costHover")
                  .style("visibility", "hidden")
                  .append("text")
                  .attr("x", -10)
                  .attr("y", 30);

    var canHover = canadaCostGraph.append("g")
                  .attr("class", "costHover")
                  .style("visibility", "hidden")
                  .append("text")
                  .attr("x", -10)
                  .attr("y", 30);

    function usTrackCost() {
        var coord = d3.mouse(this);
        var ycoord = revenueYScale.invert(d3.mouse(this)[1]);
        usHover.attr("transform", "translate(" + coord[0] + "," + coord[1] + ")");
        usHover.text('$'+ycoord.toFixed(2));
    };

    function canTrackCost() {
        var coord = d3.mouse(this);
        var ycoord = revenueYScale.invert(d3.mouse(this)[1]);
        canHover.attr("transform", "translate(" + coord[0] + "," + coord[1] + ")");
        canHover.text('$'+ycoord.toFixed(2));
    };

    //append area fills
    usCostGraph.append("path")
            .attr("d",revenueArea(usArray))
            .attr('id','usRevenueArea')
            .attr('class','costTime');

    usCostGraph.append("path")
            .attr("d",costArea(usArray))
            .attr('id','usCostArea')
            .attr('class','costTime');

    //append visible revenue path and hidden revenue path to increase area of hover to make the line easier to hover over
    usCostGraph.append("path")
            .attr("d",revenueLine(usArray))
            .attr('id','usRevenuePath')
            .attr('class','costTime')

    usCostGraph.append("path")
            .attr("d",revenueLine(usArray))
            .attr('class','costTime')
            .attr("stroke", 'transparent')
            .attr("fill", "none")
            .attr("stroke-width", 20)
            .on("mouseover", function() { 
                usHover.style("visibility", "visible");
                d3.select('#usCostArea')
                  .style('opacity',0.2)
                  .style('transition','linear 400ms, opacity 400ms');
                d3.select("#usCostPath")
                    .style('opacity',0.2)
                    .style('transition','linear 400ms, opacity 400ms');
                d3.select('#usCostLabel')
                    .style('opacity',0.2)
                    .style('transition','linear 400ms, opacity 400ms');
            })
            .on("mouseout", function() { 
                usHover.style("visibility", "hidden");
                d3.select('#usCostArea')
                  .style('opacity',0.7); 
                d3.select("#usCostPath")
                    .style('opacity',1);
                d3.select('#usCostLabel')
                    .style('opacity',1);
            })
            .on("mousemove", usTrackCost);

    //append visible cost path and hidden cost path to increase area of hover to make the line easier to hover over
    usCostGraph.append("path")
            .attr("d",costLine(usArray))
            .attr('id','usCostPath')
            .attr('class','costTime');

    usCostGraph.append("path")
            .attr("d",costLine(usArray))
            .attr('class','costTime')
            .attr("stroke", 'transparent')
            .attr("fill", "none")
            .attr("stroke-width", 20)
            .on("mouseover", function() { 
                usHover.style("visibility", "visible"); 
                d3.select('#usRevenueArea')
                  .style('opacity',0.2)
                  .style('transition','linear 400ms, opacity 400ms');
                d3.select("#usRevenuePath")
                    .style('opacity',0.2)
                    .style('transition','linear 400ms, opacity 400ms');
                d3.select('#usRevenueLabel')
                    .style('opacity',0.2)
                    .style('transition','linear 400ms, opacity 400ms');
            })
            .on("mouseout", function() { 
                usHover.style("visibility", "hidden"); 
                d3.select('#usRevenueArea')
                  .style('opacity',0.7); 
                d3.select("#usRevenuePath")
                    .style('opacity',1);
                d3.select('#usRevenueLabel')
                    .style('opacity',1);
            })
            .on("mousemove", usTrackCost);

    //add labels for revenues and costs
    usCostGraph.append('g')
                .attr('transform','translate(0,450)')
                .attr('class','costTime')
                .call(d3.axisBottom(usCostTimeXScale).tickFormat(d3.format('d')));

    usCostGraph.append('g')
                .attr('transform','translate(580,0)')
                .attr('class','axisHidden')
                .call(d3.axisRight(revenueYScale).tickFormat(d=>'$'+d));

    usCostGraph.append('text')
                .attr('transform','rotate(270) translate(-270,15)')
                .attr('class', 'labels costTime')
                .text('Value per Gallon');

    usCostGraph.append('text')
                .attr('transform','translate(270,15)')
                .attr('class','labels')
                .text('United States')
                .style('font-weight','800');

    usCostGraph.append('text')
                .attr('class','costTime')
                .attr('x',65)
                .attr('y',330)
                .text('Revenues')
                .attr('id','usRevenueLabel')
                .attr('fill','#26C1D2');

    usCostGraph.append('text')
                .attr('class','costTime')
                .attr('x',65)
                .attr('y',400)
                .text('Costs')
                .attr('id','usCostLabel')
                .attr('fill','#343176');

    //append area fills
    canadaCostGraph.append("path")
        .attr("d",revenueArea(canadaArray))
        .attr('id','canadaRevenueArea')
        .attr('class','costTime')

    canadaCostGraph.append("path")
        .attr("d",costArea(canadaArray))
        .attr('id','canadaCostArea')
        .attr('class','costTime')

    //append visible revenue path and hidden revenue path to increase area of hover to make the line easier to hover over
    canadaCostGraph.append("path")
        .attr("d",revenueLine(canadaArray))
        .attr('id','canadaRevenuePath')
        .attr('class','costTime');

    canadaCostGraph.append("path")
            .attr("d",revenueLine(canadaArray))
            .attr('class','costTime')
            .attr("stroke", 'transparent')
            .attr("fill", "none")
            .attr("stroke-width", 30)
            .on("mouseover", function() { 
                canHover.style("visibility", "visible");
                d3.select('#canadaCostArea')
                  .style('opacity',0.2)
                  .style('transition','linear 400ms, opacity 400ms');
                d3.select("#canadaCostPath")
                    .style('opacity',0.2)
                    .style('transition','linear 400ms, opacity 400ms');
                d3.select("#canadaCostLabel")
                    .style('opacity',0.2)
                    .style('transition','linear 400ms, opacity 400ms');
            })
            .on("mouseout", function() { 
                canHover.style("visibility", "hidden");
                d3.select('#canadaCostArea')
                  .style('opacity',0.7); 
                d3.select("#canadaCostPath")
                    .style('opacity',1);
                d3.select("#canadaCostLabel")
                    .style('opacity',1);
            })
            .on("mousemove", canTrackCost);

     //append visible cost path and hidden cost path to increase area of hover to make the line easier to hover over
    canadaCostGraph.append("path")
        .attr("d",costLine(canadaArray))
        .attr('id','canadaCostPath')
        .attr('class','costTime');

    canadaCostGraph.append("path")
        .attr("d",costLine(canadaArray))
        .attr('class','costTime')
        .attr("stroke", 'transparent')
        .attr("fill", "none")
        .attr("stroke-width", 30)
        .on("mouseover", function() { 
            d3.select('#canadaRevenueArea')
                  .style('opacity',0.2)
                  .style('transition','linear 400ms, opacity 400ms');
            d3.select("#canadaRevenuePath")
                .style('opacity',0.2)
                .style('transition','linear 400ms, opacity 400ms');
            d3.select("#canadaRevenueLabel")
                    .style('opacity',0.2)
                    .style('transition','linear 400ms, opacity 400ms');
            canHover.style("visibility", "visible"); 
        })
        .on("mouseout", function() { 
            canHover.style("visibility", "hidden"); 
            d3.select('#canadaRevenueArea')
                  .style('opacity',0.7); 
            d3.select("#canadaRevenuePath")
                .style('opacity',1);
            d3.select("#canadaRevenueLabel")
                .style('opacity',1);
        })
        .on("mousemove", canTrackCost);

    //append axes and labels
    canadaCostGraph.append('g')
                .attr('transform','translate(0,450)')
                .attr('class','costTime')
                .call(d3.axisBottom(usCostTimeXScale).tickFormat(d3.format('d')));

    canadaCostGraph.append('g')
                .attr('transform','translate(50,0)')
                .attr('class','axisHidden')
                .call(d3.axisLeft(revenueYScale));

    canadaCostGraph.append('g')
                .attr('transform','translate(30,0)')
                .attr('class','axisCenter')
                .call(d3.axisLeft(revenueYScale).tickFormat(d=>'$'+d));

    canadaCostGraph.append('text')
                    .attr('transform','translate(300,15)')
                    .attr('class','labels')
                    .text('Canada')
                    .style('font-weight','800');

    canadaCostGraph.append('text') 
                    .attr('class','costTime')
                    .attr('x',500)
                    .attr('y',100)
                    .attr('id','canadaRevenueLabel')
                    .text('Revenues')
                    .attr('fill','#FF8C67');

    canadaCostGraph.append('text') 
                    .attr('class','costTime')
                    .attr('x',525)
                    .attr('y',200)
                    .attr('id','canadaCostLabel')
                    .text('Costs')
                    .attr('fill','#B40228');

    //create scales for cost over price graphs
    usCostPriceXScale = d3.scaleLinear()
                            .domain([2.5,3.9])
                            .range([50,580]);

    canadaCostPriceXScale = d3.scaleLinear()
                            .domain([3.5,9.5])
                            .range([50,580]);

    //append circles for cost over price graphs
    usCostGraph.append('g')
        .attr('class','usCostCircles costPrice')
        .selectAll("circle")
        .data(usArray)
        .enter().append("circle")
        .attr('r',5)
        .style('opacity',0.8)
        .attr('cx',function(d) {return usCostPriceXScale(d.Price); })
        .attr('cy',function(d) {return revenueYScale(d.Cost); })
        .on("mouseover",function(d) {
            d3.select(this)
                .style('fill','#71B4D8')
                .attr('r',7)
                .style('transition','linear 300ms, opacity 300ms');

            usCostGraph.append("text")
                        .attr('x',function() { return usCostPriceXScale(d.Price); })
                        .attr('y',function() {return revenueYScale(d.Cost)-10; })
                        .attr('id','e'+d.Year)
                        .text(function() { return "$"+d.Price.toFixed(2); });
        })
        .on("mouseout",function(d) {
            d3.select(this)
                .style('opacity',0.8)
                .attr('r',5)
                .style('fill','#0C408E');
            d3.select("#e"+d.Year).remove();
        });

    canadaCostGraph.append('g')
        .attr('class','canadaCostCircles costPrice')
        .selectAll("circle")
        .data(canadaArray)
        .enter().append("circle")
        .attr('r',5)
        .style('opacity',0.8)
        .attr('cx',function(d) {return canadaCostPriceXScale(d.Price); })
        .attr('cy',function(d) {return revenueYScale(d.Cost); })
        .on("mouseover",function(d) {
            d3.select(this)
                .style('fill','#FF9168')
                .attr('r',7)
                .style('transition','linear 300ms, opacity 300ms');

            canadaCostGraph.append("text")
                        .attr('x',function() { return canadaCostPriceXScale(d.Price)-25; })
                        .attr('y',function() {return revenueYScale(d.Cost)-10; })
                        .attr('id','c'+d.Year)
                        .text(function() { return "$"+d.Price.toFixed(2); });
        })
        .on("mouseout",function(d) {
            d3.select(this)
                .style('opacity',0.8)
                .attr('r',5)
                .style('fill','#E1202C');
            d3.select("#c"+d.Year).remove();
        });

    //append axes and labels
    usCostGraph.append('g')
                .attr('transform','translate(0,450)')
                .attr('class','costPrice axisGrey')
                .call(d3.axisBottom(usCostPriceXScale).tickFormat(d => "$"+d));

    usCostGraph.append('text')
                .attr('transform','translate(565,490)')
                .attr('class','costPrice')
                .text('Price')

    usCostGraph.append('text')
                .attr('transform','rotate(270) translate(-270,15)')
                .attr('class', 'labels costPrice')
                .text('Cost per Gallon');

    canadaCostGraph.append('text')
                .attr('transform','translate(0,490)')
                .attr('class','costPrice')
                .text('per Gallon')

    canadaCostGraph.append('g')
        .attr('transform','translate(0,450)')
        .attr('class','costPrice axisGrey')
        .call(d3.axisBottom(canadaCostPriceXScale).tickFormat(d => "$"+d));

    /* PRODUCTION GRAPHS *****************************************/

    var productionTimeXScale = d3.scaleLinear()
                                .domain([1999.4,2014.5])
                                .range([50,940]);
    var productionYScale = d3.scaleLinear()
                            .domain([57,79])
                            .range([500,10]);
    var usProductionColorScale = d3.scaleLinear()
                                 .domain([2.5,3.9])
                                 .range(['lightblue','#0C408E']);
    var canadaProductionColorScale = d3.scaleLinear()
                                 .domain([3.5,9.5])
                                 .range(['pink','#E1202C']);
    //add us legend
    var usLegend = productionGraph.append("defs")
                            .append("linearGradient")
                            .attr("id","usLegend")
                            .attr("x1", "0%")
                            .attr("y1", "0%")
                            .attr("x2", "100%")
                            .attr("y2", "0%");

    usLegend.append("stop")
        .attr("offset","0%")
        .attr("stop-color",usProductionColorScale(2.5));

    usLegend.append("stop")
        .attr("offset","100%")
        .attr("stop-color",usProductionColorScale(3.9));

    //add canadian legend
    var canLegend = productionGraph.append("defs")
                            .append("linearGradient")
                            .attr("id","canLegend")
                            .attr("x1", "0%")
                            .attr("y1", "0%")
                            .attr("x2", "100%")
                            .attr("y2", "0%");

    canLegend.append("stop")
        .attr("offset","0%")
        .attr("stop-color",canadaProductionColorScale(3.5));

    canLegend.append("stop")
        .attr("offset","100%")
        .attr("stop-color",canadaProductionColorScale(9.5));

    //add color gradients for us and canada
    productionGraph.append("rect")
        .attr("width",155)
        .attr("height",20)
        .attr('x',150)
        .attr('y',50)
        .attr('class','productionTime')
        .style("fill","url(#usLegend)");

    productionGraph.append("rect")
        .attr("width",155)
        .attr("height",20)
        .attr('x',150)
        .attr('y',80)
        .attr('class','productionTime')
        .style("fill","url(#canLegend)")

    //add background rectangle
    productionGraph.append("rect")
        .attr("width",250)
        .attr("height",100)
        .attr('x',100)
        .attr('y',25)
        .attr('class','productionTime')
        .style("stroke","grey")
        .style('stroke-width',0.5)
        .style('fill','none');

    //add text labels
    productionGraph.append('text')
        .attr('class','productionTime')
        .attr('x',110)
        .attr('y',65)
        .text('$2.50')
        .style('font-size','14px')

    productionGraph.append('text')
        .attr('x',310)
        .attr('y',65)
        .text('$3.90')
        .attr('class','productionTime')
        .style('font-size','14px')

    productionGraph.append('text')
        .attr('x',110)
        .attr('y',95)
        .text('$3.50')
        .attr('class','productionTime')
        .style('font-size','14px')

    productionGraph.append('text')
        .attr('x',310)
        .attr('y',95)
        .text('$9.50')
        .attr('class','productionTime')
        .style('font-size','14px')

    //add country names and title
    productionGraph.append('text')
        .attr('x',100+250/2)
        .attr('y',42)
        .attr('text-anchor', 'middle')
        .attr('class','productionTime')
        .text('United States');

    productionGraph.append('text')
        .attr('x',100+250/2)
        .attr('y',118)
        .attr('text-anchor', 'middle')
        .attr('class','productionTime')
        .text('Canada');

    //add production bars to bar graph
    productionGraph.append('g')
        .attr('class','usProductionBars productionTime')
        .selectAll("rect")
        .data(usArray)
        .enter().append("rect")
        .attr('x', function(d){ return productionTimeXScale(d.Year)-10; })
        .attr('y',function(d) {return productionYScale(d.CapitaProduction); })
        .attr('width',20)
        .attr('height',function(d) { return 500 - productionYScale(d.CapitaProduction);})
        .attr('fill',function(d) { return usProductionColorScale(d.Price); })
        .on("mouseover",function(d) {
            d3.select('.canadaProductionBars')
                .style('opacity',0.25)
                .style('transition','linear 400ms, opacity 400ms');

            productionGraph.append("text")
                        .attr('x',function() { return productionTimeXScale(d.Year)-30; })
                        .attr('y',function() {return productionYScale(d.CapitaProduction)-10; })
                        .attr('id','f'+d.Year)
                        .text(function() { return d.CapitaProduction.toFixed(2)+" gal."; });
        })
        .on("mouseout",function(d) {
            d3.select('.canadaProductionBars')
                .style('opacity',1);
            d3.select("#f"+d.Year).remove();
        });

     productionGraph.append('g')
        .attr('class','canadaProductionBars productionTime')
        .selectAll("rect")
        .data(canadaArray)
        .enter().append("rect")
        .attr('x', function(d){ return productionTimeXScale(d.Year)-10; })
        .attr('y',function(d) {return productionYScale(d.CapitaProduction); })
        .attr('width',20)
        .attr('height',function(d) { return 500 - productionYScale(d.CapitaProduction);})
        .attr('fill',function(d) { return canadaProductionColorScale(d.Price); })
        .on("mouseover",function(d) {
            d3.select('.usProductionBars')
                .style('opacity',0.25)
                .style('transition','linear 400ms, opacity 400ms');

            productionGraph.append("text")
                        .attr('x',function() { return productionTimeXScale(d.Year)-30; })
                        .attr('y',function() {return productionYScale(d.CapitaProduction)-10; })
                        .attr('id','g'+d.Year)
                        .text(function() { return d.CapitaProduction.toFixed(2)+" gal."; });
        })
        .on("mouseout",function(d) {
            d3.select('.usProductionBars')
                .style('opacity',1);
            d3.select("#g"+d.Year).remove();
        });

    //add axes and labels
    productionGraph.append('g')
               .attr('transform','translate(50,0)')
               .call(d3.axisLeft(productionYScale));

    productionGraph.append('text')
        .attr('transform','rotate(270) translate(-350,15)')
        .attr('class','labels')
        .text("Production per capita (gallons)");

    productionGraph.append('g')
               .attr('transform','translate(0,500)')
               .attr('class','productionTime')
               .call(d3.axisBottom(productionTimeXScale).tickFormat(d3.format('d')));

    productionGraph.append('text')
        .attr('class','labels productionPrice')
        .attr('transform','translate(480,540)')
        .text("Price per gallon");

    //add x scale for production over price and add axis
    var productionPriceXScale = d3.scaleLinear()
                                .domain([2.5,9.5])
                                .range([50,940]);

    productionGraph.append('g')
                    .attr('class','productionPrice')
                    .attr('transform','translate(0,500)')
                    .call(d3.axisBottom(productionPriceXScale).tickFormat(d=> '$'+d));

    //add circles to production over price graph
    productionGraph.append('g')
        .attr('class','usProductionCircles productionPrice')
        .selectAll("circle")
        .data(usArray)
        .enter().append("circle")
        .attr('r',5)
        .attr('cx',function(d) {return productionPriceXScale(d.Price); })
        .attr('cy',function(d) {return productionYScale(d.CapitaProduction); })
        .on("mouseover",function(d) {
            d3.select('.canadaProductionCircles')
                .style('opacity',0.2);
            d3.select(this)
                .style('fill','#71B4D8')
                .attr('r',7)
                .style('transition','linear 300ms, opacity 300ms');

            productionGraph.append("text")
                        .attr('x',function() { return productionPriceXScale(d.Price)+10; })
                        .attr('y',function() {return productionYScale(d.CapitaProduction)+5; })
                        .attr('id','j'+d.Year)
                        .text(function() { return "$"+d.Price.toFixed(2); });
        })
        .on("mouseout",function(d) {
            d3.select('.canadaProductionCircles')
                .style('opacity',1);
            d3.select(this)
                .style('fill','#0C408E')
                .attr('r',5);
            d3.select("#j"+d.Year).remove();
        });

    productionGraph.append('g')
        .attr('class','canadaProductionCircles productionPrice')
        .selectAll("circle")
        .data(canadaArray)
        .enter().append("circle")
        .attr('r',5)
        .attr('cx',function(d) {return productionPriceXScale(d.Price); })
        .attr('cy',function(d) {return productionYScale(d.CapitaProduction); })
        .on("mouseover",function(d) {
            d3.select('.usProductionCircles')
                .style('opacity',0.2);
            d3.select(this)
                .style('fill','#FF9168')
                .attr('r',7)
                .style('transition','linear 300ms, opacity 300ms');

            productionGraph.append("text")
                        .attr('x',function() { return productionPriceXScale(d.Price)-45; })
                        .attr('y',function() {return productionYScale(d.CapitaProduction)+10; })
                        .attr('id','k'+d.Year)
                        .text(function() { return "$"+d.Price.toFixed(2); });
        })
        .on("mouseout",function(d) {
            d3.select('.usProductionCircles')
                .style('opacity',1);
            d3.select(this)
                .style('fill','#E1202C')
                .attr('r',5);
            d3.select("#k"+d.Year).remove();
        });

    /*BONUS PRODUCTION GRAPH **************************************/

    //us number of farms in 2000: 82937, 2014: 44809
    //canada 2000: 18520, 2014: 11620

    //consulted https://github.com/d3/d3-tile/issues/3 to see how to append multiple images
    var us2000 = bonusGraph1.append('g')
            .selectAll('image')
            .data([0,1,2,3,4,5,6,7,8])
            .enter().append('image')
            .attr("xlink:href","images/barn.png")
            .attr('transform','translate(160,-25)')
            .attr("width", 60)
            .attr("height", 60)
            .attr('x',function(d) { return d*65; })
            .attr('y',function(d) { return 50 })
            .on('mouseover',function() {
                bonusGraph1.append('text')
                            .attr('x',610)
                            .attr('y',20)
                            .text('82,937 farms')
                            .attr('class','us2000text');
                })
            .on('mouseout',function() {
                d3.select('.us2000text').remove();
            });

    var us2014 = bonusGraph1.append('g')
            .selectAll('image')
            .data([0,1,2,3,4])
            .enter().append('image')
            .attr("xlink:href","images/barn.png")
            .attr('transform','translate(160,-25)')
            .attr("width", 60)
            .attr("height", 60)
            .attr('x',function(d) { return d*65; })
            .attr('y',function(d) { return 140 })
            .on('mouseover',function() {
                bonusGraph1.append('text')
                            .attr('x',470)
                            .attr('y',155)
                            .text('44,809 farms')
                            .attr('class','us2014text');
                })
            .on('mouseout',function() {
                d3.select('.us2014text').remove();
            });

    //append labels
    bonusGraph1.append('text')
            .attr('x',0)
            .attr('y',130)
            .attr('transform','translate(0,-25)')
            .text('United States')
            .attr('font-weight',800);
    bonusGraph1.append('text')
            .attr('x',110)
            .attr('y',90)
            .attr('transform','translate(0,-25)')
            .style('font-size','14px')
            .text('2000');
    bonusGraph1.append('text')
            .attr('x',110)
            .attr('y',180)
            .attr('transform','translate(0,-25)')
            .style('font-size','14px')
            .text('2014');

    //append images to canada # of farms
    var canada2000 = bonusGraph1.append('g')
            .selectAll('image')
            .data([0,1])
            .enter().append('image')
            .attr("xlink:href","images/barn.png")
            .attr('transform','translate(160,-25)')
            .attr("width", 60)
            .attr("height", 60)
            .attr('x',function(d) { return d*65; })
            .attr('y',function(d) { return 275 })
            .on('mouseover',function() {
                bonusGraph1.append('text')
                            .attr('x',290)
                            .attr('y',290)
                            .text('18,520 farms')
                            .attr('class','can2000text');
                })
            .on('mouseout',function() {
                d3.select('.can2000text').remove();
            });
    var canada2014 = bonusGraph1.append('g')
            .selectAll('image')
            .data([0,1])
            .enter().append('image')
            .attr("xlink:href","images/barn.png")
            .attr('transform','translate(160,-25)')
            .attr("width", 60)
            .attr("height", 60)
            .attr('x',function(d) { return d*65; })
            .attr('y',function(d) { return 365 })
            .on('mouseover',function() {
                bonusGraph1.append('text')
                            .attr('x',250)
                            .attr('y',380)
                            .text('11,620 farms')
                            .attr('class','can2014text');
                })
            .on('mouseout',function() {
                d3.select('.can2014text').remove();
            });
    
    //consulted https://stackoverflow.com/questions/29278107/d3js-how-to-select-nth-element-of-a-group?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa to see how to get the nodes
    var us2000Elements = us2000.nodes();
    var us2014Elements = us2014.nodes();
    var canada2000Elements = canada2000.nodes();
    var canada2014Elements = canada2014.nodes();

    //top, right, bottom, left order
    //clipped based on calculating the width from the number of farms
    d3.select(us2000Elements[8]).style('clip-path','inset(0px 42.4px 0px 0px)');
    d3.select(us2014Elements[4]).style('clip-path','inset(0px 31.1px 0px 0px)');
    d3.select(canada2000Elements[1]).style('clip-path','inset(0px 8.9px 0px 0px)');
    d3.select(canada2014Elements[1]).style('clip-path','inset(0px 50.2px 0px 0px)');

    //append legend for farm graph, labels and text
    bonusGraph1.append('g')
                .selectAll('image')
                .data([0])
                .enter().append('image')
                .attr("xlink:href","images/barn.png")
                .attr('transform','translate(160,-50)')
                .attr("width", 40)
                .attr("height", 40)
                .attr('x',function(d) { return d*65; })
                .attr('y',function(d) { return 525 })

    bonusGraph1.append('text')
            .attr('x',215)
            .attr('y',505)
            .attr('transform','translate(0,0)')
            .text('=')
            .style('font-size','14px');
    bonusGraph1.append('text')
            .attr('x',235)
            .attr('y',505)
            .attr('transform','translate(0,0)')
            .style('font-size','14px')
            .text('10,000 Farms');
    bonusGraph1.append('text')
            .attr('x',42)
            .attr('y',355)
            .text('Canada')
            .attr('transform','translate(0,-25)')
            .attr('font-weight',800);
    bonusGraph1.append('text')
            .attr('x',110)
            .attr('y',315)
            .text('2000')
            .attr('transform','translate(0,-25)')
            .style('font-size','14px');
    bonusGraph1.append('text')
            .attr('x',110)
            .attr('y',405)
            .attr('transform','translate(0,-25)')
            .style('font-size','14px')
            .text('2014');

    //production per farm
    bonusXScale = d3.scaleLinear()
                    .domain([2000,2014])
                    .range([30,520]);

    //us 2000: 242198, 2014: 551798, 
    //can 2000: 106665, 2014: 177918
    bonusYScale = d3.scaleLinear()
                    .domain([100000,555000])
                    .range([375,0]);

    var farmLine = d3.line()
                        .x(d=> bonusXScale(d.Year))
                        .y(d=> bonusYScale(d.FarmProduction));

    //append path and circles on endpoints
    bonusGraph2.append('path')
                .attr('d',farmLine(usArray))
                .attr("fill","none")
                .attr('stroke','#0C408E');

    bonusGraph2.append('circle')
                .attr('r',3)
                .style("fill","#0C408E")
                .attr('cx', bonusXScale(2000))
                .attr('cy',bonusYScale(242198));

    bonusGraph2.append('circle')
                .attr('r',3)
                .style("fill","#0C408E")
                .attr('cx', bonusXScale(2014))
                .attr('cy',bonusYScale(551798));

    //append labels for endpoints
    bonusGraph2.append('text')
                .attr('x',0)
                .attr('y',230)
                .text('242,198 gal.')
                .style('font-size','14px');
    bonusGraph2.append('text')
                .attr('x',425)
                .attr('y',10)
                .text('551,798 gal.')
                .style('font-size','14px');
    bonusGraph2.append('text')
                .attr('x',0)
                .attr('y',350)
                .text('106,665 gal.')
                .style('font-size','14px');
    bonusGraph2.append('text')
                .attr('x',450)
                .attr('y',300)
                .text('177,918 gal.')
                .style('font-size','14px');

    //append path for canada, endpoint circles, labels
    bonusGraph2.append('path')
                .attr('d',farmLine(canadaArray))
                .attr("fill","none")
                .attr('stroke','#E1202C');

    bonusGraph2.append('circle')
                .attr('r',3)
                .style("fill","#E1202C")
                .attr('cx', bonusXScale(2000))
                .attr('cy',bonusYScale(106665));

    bonusGraph2.append('circle')
                .attr('r',3)
                .style("fill","#E1202C")
                .attr('cx', bonusXScale(2014))
                .attr('cy',bonusYScale(177918));

    bonusGraph2.append('g')
                .attr('transform','translate(0,400)')
                .call(d3.axisBottom(bonusXScale).tickFormat(d3.format('d')));

    bonusGraph2.append('text')
                .attr('x',130)
                .attr('y',505)
                .text('Production per farm is increasing for both...')

    bonusGraph2.append('text')
                .attr('x',30)
                .attr('y',12)
                .text('Production per Farm')
                .style('font-weight',800);
}); //done!