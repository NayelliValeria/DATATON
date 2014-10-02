
var width = 1200, height = 510, centered;

var svg = d3.select(".map").append("svg")
			.attr({"width": width, "height":height});

var projection = d3.geo.mercator()
	    		.scale(1500)
    			.center([-100, 25]);

var path = d3.geo.path()
    		.projection(projection);

var g = svg.append("g");


var max = 16000000;
var min = 0;

var color = d3.scale.linear()
	.domain([min,max])
	.range(["yellow","red"]);

d3.csv("/Mapa/densidad.csv", function(densidad){
	d3.json("/Mapa/mx.json", function(error, mx){

		var state = g.append("g")
		.attr("id", "states")
	    .selectAll("path")
	    .data(topojson.object(mx, mx.objects.states).geometries)
	    .enter().append("path")
	    .attr("d", path)
	    .attr("class", "state-boundary")
	    .attr("fill", function(d){
	    	return color(densidad[parseInt(d.properties.state_code)-1].pob);
	    });

	    state.on("click", function(d){
	    	/*Ocultar stado*/
	    	/*d3.select("#states").style("display", "none");*/

	    	g.append("g")
	    	.attr("id", "municipalities")
	    	.selectAll("path")
	    	.data(topojson.object(mx, mx.objects.municipalities).geometries)
	    	.enter().append("path")
	    	.attr("d", path)
	    	.attr("fill", function(d){
	    		return color(densidad[parseInt(d.properties.state_code)-1].pob);
		    });

			
	    });  
	});
});


/*d3.csv("/Mapa/densidad.csv", function(densidad){
	console.log(densidad);
	d3.json("/Mapa/mx.json", function(error, mx){
		console.log(mx);
		g.append("g")
	      .attr("id", "states")
	    .selectAll("path")
	      .data(topojson.object(mx, mx.objects.municipalities).geometries)
	    .enter().append("path")
	      .attr("d", path)
	      .attr("fill", function(d){			      	
		  return color(densidad[parseInt(d.properties.state_code)-1].pob);
	      })
	      .on("click", function(d){
	      	console.log(d);
	      	var x, y, k;
			  if (d && centered !== d) {
			    var centroid = path.centroid(d);
			    x = centroid[0];
			    y = centroid[1];
			    k = 8;
			    centered = d;
			  } else {
			    x = width / 2;
			    y = height / 2;
			    k = 1;
			    centered = null;
			  }
			  g.selectAll("path")
			      .classed("active", centered && function(d) { return d === centered; });

			  g.transition()
			      .duration(750)
			      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")

						      })
				    	});
			    	});

*/