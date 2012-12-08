function makeSine(elem_selector, width, height) {

	var n = 443,
	    duration = 20,
	    now = new Date(Date.now() - duration),
	    count = 0,
	    data = d3.range(n).map(function() { return 0; });

	var x = d3.time.scale()
	    .domain([now - (n - 2) * duration, now - duration])
	    .range([0, width]);

	var y = d3.scale.linear()
	    .range([0, height]);

		var line = d3.svg.line()
		    .interpolate("basis")
		    .x(function(d, i) { return x(now - (n - 1 - i) * duration); })
		    .y(function(d, i) { return y(d); });

	var svg = d3.select(elem_selector).append("svg")
	  .append("g")
	  	.attr("width", width)
	  	.attr("height", height);

	svg.append("defs").append("clipPath")
	    .attr("id", "clip")
	  .append("rect")
	    .attr("width", width)
	    .attr("height", height);

	var axis = svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .style("fill", "rgb(0, 255, 0)")
	    .call(x.axis = d3.svg.axis().scale(x).orient("bottom"));

	var path = svg.append("g")
	    .attr("clip-path", "url(#clip)")
	  .append("path")
	    .data([data])
	    .attr("class", "line")
	    .style("fill", "rgb(0, 255, 0)");

	function render() {
	  // update the domains
	  now = new Date();
	  x.domain([now - (n - 2) * duration, now - duration]);
	  y.domain([-2.0, 2.0]);

	  // push the accumulated count onto the back, and reset the count
	  data.push(Math.sin((Date.now() / 1000)) + Math.cos((Date.now() / 3000 + 0.3)));

	  // redraw the line
	  svg.select(".line")
	      .attr("d", line)
	      .attr("transform", null);

	  // slide the x-axis left
	  axis.transition()
	      .duration(duration)
	      .ease("linear")
	      .call(x.axis);

	  // slide the line left
	  path.transition()
	      .duration(duration)
	      .ease("linear")
	      .attr("transform", "translate(" + x(now - (n - 1) * duration) + ")")
	      .each("end", render);

	  // pop the old data point off the front
	  data.shift();
	}	 

	render();
}
