// D3 command / D3 DOM Manipulation

// Part 1 - Drawing SVG shapes - Page 255
// Drawing a rectangle
d3.select("#shapes") //Get the SVG Element in my DOM
.append("rect") //Append a rectangle to the SVG
.attr("x", 200) //Set the x position of the rectangle
.attr("y",50)
.attr("width", 100) //Set the width of the rectangle
.attr("height", 100) //Set the height of the rectangle
.attr("fill", "blue") //Set the fill color of the rectangle

// Drawing a circle
d3.select("#shapes") //Get the SVG Element in my DOM
.append("circle")  // Append a circle to the SVG
.attr("cx", 100) //Set the x position of the circle
.attr("cy", 100) //Set the y position of the circle
.attr("r", 50) //Set the radius of the circle
.attr("fill", "red") //Set the fill color of the circle 

// Part 2: Simple Bar Chart (257 - 259)
// Data for the bar chart
// in JS, ES6, you use let, to declare a variable
// Use const to declare a constant -> the value will not be changed
// For memory management, if it does not change use const
//const dataset = [25,50,75,100,125]; // Array of data values for my bar chart
const dataset = [2.5,5,7.5,10,12.5,30,12.5,18]; // Smallar data to demonstrate scaleLinear

// scaleLinear is a function that scales the data to fit the SVG

const heightScale = d3.scaleLinear() //Create a linear scale
.domain([0, d3.max(dataset)]) //Input data values [betwwen 0, max value in the dataset = 30]
.range([0,300]) //Output data values [between 0, 300] - height of the SVG

d3.select("#bar-chart") //Get the SVG Element in my DOM
// Based on the dataset, create a rectangle for each data
// If i have 5 data points, I will have 5 rectangles [As if it is creating a loop]
.selectAll("rect") //Select all rectangles in the SVG
.data(dataset)
.enter()
.append("rect") //Append a rectangle to the SVG

// Set the attributes of the rectangle
// Set the x position of the rectangle
// d here = referst to data value eg: 25,50,75,100,125
// i here = refers to index, eg: 0,1,2,3,4
.attr("x", (d,i)=> i * 50) //Set the x position of the rectangle
.attr("width", 40) //Set the width of the rectangle
.attr("y", (d) => 300 - heightScale(d)) //Set the y position of the rectangle, 
// to flip the bar chart, subtract the data value from the height of the SVG
.attr("height", (d) => heightScale(d)) //Set the height of the rectangle
.attr("fill", "blue") //Set the fill color of the rectangle

// Part 3: Simple Barchart with Axis , Title and Label (261-263)
const width = 500;
const height = 300;
const margin = {top:20, right:30, bottom:50, left:50}; // Margin for the chart against the SVG  

const sampleData = [25,50,75,100,125]; // Array of data values for my bar chart


// Create Scales    
// left - right scale, taking into picture the margin of the chart
// and padding between the data points
const xScale = d3.scaleBand()
.domain(sampleData.map((d,i) => i)) //Input data values [0,1,2,3,4]
.range([margin.left, width - margin.right]) //Output data values [between margin.left, width - margin.right]
.padding(0.2) //Padding between the bars    

// Similar to previous scale, this is for the y-axis
// And it will take into consideration the margin of the chart 
// [previously we did not consider the margin]  
const yScale = d3.scaleLinear()
.domain([0, d3.max(sampleData)]) //Input data values [0, max value in the dataset = 125]    
.range([height - margin.bottom, margin.top]) //Output data values [between height - margin.bottom, margin.top]

// Create the Axis
const xAxis = d3.axisBottom(xScale); //Create the x-axis // left - right based on the given scale
const yAxis = d3.axisLeft(yScale); //Create the y-axis  // top - bottom based on the given scale

// Append the x-axis to the SVG (DRAW THE X-AXIS AT THE BOTTOM OF THE SVG )
// TAKE INTO CONSIDERATION THE MARGIN
d3.select("#bar-chart-axis") //Get the SVG Element in my DOM
.append("g") //Append a group to the SVG
.attr("transform", `translate(0, ${height - margin.bottom})`) //Move the x-axis to the bottom of the SVG
.call(xAxis); //Append the x-axis to the SVG    

// Append the y-axis to the SVG (DRAW THE Y-AXIS AT THE LEFT OF THE SVG )
// TAKE INTO CONSIDERATION THE MARGIN
d3.select("#bar-chart-axis") //Get the SVG Element in my DOM
.append("g")
.attr("transform", `translate(${margin.left}, 0)`) //Move the y-axis to the left of the SVG
.call(yAxis); //Append the y-axis to the SVG
// Page 263 - Drawing and animating the bars
d3.select("#bar-chart-axis") //Get the SVG Element in my DOM
.selectAll("rect") 
.data(sampleData) 
.enter()
.append("rect")
.attr("x", (d,i)=> xScale(i)) //Set the x position of the rectangle with the scalling
.attr("width", xScale.bandwidth()) //Set the width of the rectangle
.attr("fill", "blue") //Set the fill color of the rectangle
.transition()
.duration(1000)
.attr("y", (d) =>yScale(d)) //Set the y position of the rectangle, 
// to flip the bar chart, subtract the data value from the height of the SVG
.attr("height", (d) =>  height - margin.bottom -  yScale(d)) //Set the height of the rectangle

// Part 2 of page 262:  (Adding Labels and Title)

// Add Title
d3.select("#bar-chart-axis").append("text")
  .attr("x", width / 2)
  .attr("y", margin.top)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .text("Bar Chart Example");

// Add X Axis Label
d3.select("#bar-chart-axis").append("text")
  .attr("x", width / 2)
  .attr("y", height - 10)
  .attr("text-anchor", "middle")
  .text("Categories");

// Add Y Axis Label
d3.select("#bar-chart-axis").append("text")
  .attr("x", -height / 2)
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("text-anchor", "middle")
  .text("Values");

