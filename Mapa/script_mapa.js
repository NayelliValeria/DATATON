var m_widht = 1100,
	width = 1330, 
	height=550, 
	state, 
	municipalities;

var projection = d3.geo.mercator()
						.scale(1500)
						.center([ -107, 25]);

var path = d3.geo.path().projection(projection);

var svg = d3.select(".map").append("svg")
			.attr("preserveAspectRatio", "xMidYMid")
			.attr("viewBox", "0 0 " + width + " " + height)
			.attr({"width": width, "height":height});

svg.append("rect")
	.attr("fill", "white")
    .attr("width", width)
    .attr("height", height)
    .on("click", state_clicked);

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
		.attr("class", "states")
	    .selectAll("path")
	    .data(topojson.object(mx, mx.objects.states).geometries)
	    .enter().append("path")
	    .attr("d", path)
	    .attr("fill", function(d){
	    	return color(densidad[parseInt(d.properties.state_code)-1].pob);
	    })
	    .attr("class", "state-boundary");

	    state.on("click", state_clicked);
	});
});

/*
d3.json("mx.json", function(error, mx) {
	g.append("g")
    	.attr("id", "states")
    	.selectAll("path")
    	.data(topojson.object(mx, mx.objects.states).geometries)
    	.enter()
    	.append("path")
    	.attr("id", function(d) { return d.properties.state_code; })
    	.attr("d", path)
    	.on("click", state_clicked);
});*/

function zoom(xyz) {
  g.transition()
    .duration(750)
    .attr("transform", "translate(" + projection.translate() + ")scale(" + xyz[2] + ")translate(-" + xyz[0] + ",-" + xyz[1] + ")")
    .selectAll(["#states", "#municipalities"])
    .style("stroke-width", 1.0 / xyz[2] + "px")
    .selectAll(".municipalities")
    .attr("d", path.pointRadius(20.0 / xyz[2]));
    alert(xyz);
}

function get_xyz(d) {
  var bounds = path.bounds(d);
  var w_scale = (bounds[1][0] - bounds[0][0]) / width;
  var h_scale = (bounds[1][1] - bounds[0][1]) / height;
  var z = .96 / Math.max(w_scale, h_scale);
  var x = (bounds[1][0] + bounds[0][0]) / 2;
  var y = (bounds[1][1] + bounds[0][1]) / 2 + (height / z / 6);
  return [x, y, z];
}

function state_clicked(d) {	console.log(d)
  	g.selectAll("#municipalities").remove();
  	municipality = null;

  	if (municipality) {
   	 	g.selectAll("#" + municipality.properties.state_code).style('display', null);
  	}

  	if (d && municipality !== d) {
  		var xyz = get_xyz(d);
	    municipality = d;
	    if(d.properties.state_code < 10)
	    	n = "0" + d.properties.state_code ;
	    else
	    	n = d.properties.state_code;


	    d3.csv("/Mapa/densidad.csv", function(densidad){
	    	d3.json("/Mapa/municipios/"+n+".json", function(error, mx){
			g.append("g")
		    	.attr("id", "municipalities")
		    	.selectAll("path")
		    	.data(topojson.object(mx, mx.objects.municipalities).geometries)
		    	.enter()
		    	.append("path")
		    	.attr("id", function(d){ return d.properties.mun_code; })
		    	.attr("d", path)
		    	.attr("fill", function(d){
			    	return color(max);
			    })
			    .attr("class", "municipality-boundary");

			    zoom(xyz);
	    		g.selectAll("#" + d.properties.mun_code	).style('display', 'none');
			});
		});
	} else {
	    var xyz = [width / 2, height / 1.5, 1];
	    state = null;
	    zoom(xyz);
  	}
}

$(window).resize(function() {
  var w = $("#map").width();
  svg.attr("width", w);
  svg.attr("height", w * height / width);
});

