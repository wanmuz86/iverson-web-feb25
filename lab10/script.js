// Tips: Check that the JS and HTML are linked correctly
//alert("OK linked")
////// First part - Bar Chart //////

const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

// retrieve data from the API, 
// d3 provide a built in function that is similar to fetch
// to download a remote data
// Similar to fetch 

// d3.json is a promise-based function
// A promise based function means it can either return a successful response
// or an error response
// The success reponse is handeled by the .then() method
// The error response is handelded by the .catch() method
// Other than this, you can also use async-await to handle a promise based function
d3.json(url).then(data => {
    // The .data refers to the property data where the data is stored
    console.log(data.data);
    const dataset = data.data;

    // With promise and asynchronous process, you work/create the UI inside the then {}
    // After the data is retrieved

    // Creating the svg where the data will be displayed
    const svg = d3.select("#chart").attr("height", 800).attr("width", 600);

    // Create the scale

    // Scale for x-axis - (scaleTime) -  Used for date or time data

    const padding = 20;

    // Create a scale for x axis,
    // From the minimum value in the the dataset to the maximum value in the dataset (domain)
    // From the left padding  (20) to the right padding (range) - 380

    const xScale = d3.scaleTime()
    .domain([new Date(d3.min(dataset, d=> d[0])), new Date(d3.max(dataset, d=> d[0]))])
    .range([padding, 600 - padding]);

    // Scale for y-axis (scaleLinear) - normally used for data that is continuous  
    // Create me a scale for y axis
    // From 0 to the maximum value in the dataset (domain)
    // From the bottom padding (780) to the top padding (20)
    // y is from top to bottom, so the range is in reverse (max to min)
    const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d=> d[1])])
    .range([800-padding, padding]);

    // Creating the x-axis

    const xAxis = d3.axisBottom(xScale);
    // Draw the axis inside <g></g> element into svg
    // Give it an id of x-axis
    // Adjust the x-axis to the bottom of the svg (translate)
    svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(0,780)")
    .call(xAxis)

    // Create y axis
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
    .attr("id", "y-axis")
    .attr("transform", "translate(20,0)")
    .call(yAxis)

    // Create the bars
    // Select all the .bars (class) based on the dataset,
    // If it is not there it will create it

    // d refers to the data that we retrieved from the API 
    // eg:  [
    //  "1947-01-01",
    //  243.1
    //]
    // d[0] refers to date and d[1] refers to the GDP value
    //Pay attention of the datatype for the project, it could be [] or {} 

    // width - padding on both sides / number of data points
    // y = is width - yScale(d[1]) // and take padding into consideration
    svg.selectAll(".bar")  
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(new Date(d[0]))) 
    .attr("y", d => yScale(d[1])) 
    .attr("width", 600-2*padding/dataset.length) 
    .attr("height", d => 800 - padding - yScale(d[1]))
    .on("mouseover", (event,data)=>{
        // Our objective is to show this on the tooltip
        console.log(data[0])
        console.log(data[1])

        // Show it inside tooltip
        // Select the tooltip and show it
        // Set the position of the tooltip
        // A little bit to the right (10px)
        // and a little bit to the top (-10px)
        // of where it is hovered
        // event.pageX and event.pageY is the position of the mouse
        d3.select("#tooltip")
        .style("display","block") // Show the tooltip
        .style("left", (event.pageX + 10) + "px") // Position the tooltip
        .style("top", (event.pageY - 10) + "px") // Position the tooltip
        .html(`Date: ${data[0]} <br/> GDP: $ ${data[1]} Billion`)
    })
    .on("mouseout", ()=>{
        d3.select("#tooltip")
        .style("display","none") // Hide back the tooltip
    })

})
.catch(error => {
    console.log(error);
})

///////////////// Second part - Pie Chart //////////////////////
const pieUrl = "https://api.sheety.co/4db58997dd33ab7eaa3d621c48bdea06/mockData/fruits";
d3.json(pieUrl).then(data=>{
    console.log(data.fruits)
    const pieData = data.fruits; // verify in console the data is loaded

    // Create colorScales for the pie Chart
    // Each of the section/slice will have different color
    const color = d3.scaleOrdinal(d3.schemeSet2);

    const pieWidth = 500;
    const pieHeight = 500;
    const pieRadius = Math.min(pieWidth, pieHeight) / 2 - 20; // 20 is the padding

// Create an SVG element
// Create an svg element with the id of pie-chart
// Set the width and height of the svg element with the pieWidth and pieHeight
// Append a group element to the svg element
// Translate the group element to the center of the svg element [center of the circle]
    const svg = d3.select("#pie-chart")
    .attr("width", pieWidth)
    .attr("height", pieHeight)
    .append("g")
    .attr("transform", `translate(${pieWidth/2}, ${pieHeight/2})`);

    // Create the pie function 
    const pie = d3.pie().value(d => d.value) // d.value is the value of the data [stocks]

    // Create the arc generator
    const arc = d3.arc().innerRadius(0).outerRadius(pieRadius)

    // Create expanded arc generator for hover effect
    const arcHover = d3.arc().innerRadius(0).outerRadius(pieRadius + 10)

    // Draw the pie chart

    // Select all or create <path> elements inside the svg element
    // Based on the data given in pieData
    const slices = svg.selectAll("path")
    .data(pie(pieData))
    .enter()
    .append("path")
    .attr("d", arc) // d is the path attribute
    .attr("fill", (d,i) => color(i)) //The color is based on the colorScale
    .attr("stroke","#fff")
    .style("stroke-width", "2px")
    .style("cursor", "pointer")
    .on("mouseover", function(event, data){
        // When the mouse is hovered, make the arc bigger
        d3.select(this)
        .transition()
        .duration(200)
        .attr("d",arcHover)
        // TODO: Show the tooltip
    })
    .on("mouseout", function(event, data){
         // When the mouse is hovered, make the arc normal
        d3.select(this)
        .transition()
        .duration(200)
        .attr("d", arc)
         // TODO: Hide the tooltip
    })

})
