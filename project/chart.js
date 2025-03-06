// Create the bar chart  (follow this morning exercise)

const barUrl = "https://api.sheety.co/4db58997dd33ab7eaa3d621c48bdea06/mockData/employeemonth";
d3.json(barUrl).then(data=>{
    const dataset = data.employeemonth;
    
    const svgWidth = 800;
    const svgHeight = 500;
    const padding = 20;

    // Creating the barchart
    const svg = d3.select('#bar-chart')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    // Create the scale

    const xScale = d3.scaleTime()
    .domain([new Date(dataset[0].date), new Date(dataset[dataset.length-1].date)])
    .range([0, svgWidth]);

    const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d=>d.employee)])
    .range([svgHeight-padding, padding]);

    // Create the Axis
    const xAxis = d3.axisBottom(xScale);
    svg.append("g").attr("id", "x-axis").attr("transform", `translate(0, ${svgHeight-padding})`).call(xAxis);   


    const yAxis = d3.axisLeft(yScale);
    svg.append("g").attr("id","y-axis").attr("transform", `translate(${padding}, 0)`).call(yAxis);

    // Create the bar
    svg.selectAll(".bar")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d=>xScale(new Date(d.date)))
    .attr("y", d=>yScale(d.employee))
    .attr("width", svgWidth/(dataset.length+1))
    .attr("height", d=>svgHeight-yScale(d.employee)-padding)
})
.catch(err=> console.log(err));

// Create the pie chart  (follow this morning exercise)

const pieUrl = "https://api.sheety.co/4db58997dd33ab7eaa3d621c48bdea06/mockData/employeedept";

