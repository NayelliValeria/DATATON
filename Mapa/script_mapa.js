/*Selects*/
var width = 1100, height = 550, centered;
var svg = d3.select(".map").append("svg")
	.attr({"width": width, "height":height});

var projection = d3.geo.mercator()
	.scale(1500)
	.center([ -100, 25]);

var path = d3.geo.path()
	.projection(projection);




cargarMarginacion();

$( "#general" ).change(function() {
	var valor = $(this).val();
	$("svg").remove();

	svg = d3.select(".map").append("svg")
	.attr({"width": width, "height":height});
	
	if( valor == 1){
		cargarMarginacion();
	}
	if( valor== 2){
		urban_pop_fem();
	}
});

function cargarMarginacion(){
var g = svg.append("g");
var color = d3.scale.linear()
	.domain([-2,2])
	.range(["#f1eef6","#91003f"]);

d3.csv("Mapa/data_map.csv", function(densidad){
	console.log(densidad);
	d3.json("Mapa/mx.json", function(error, mx){
		//console.log(mx);
		g.append("g")
	      .attr("id", "states")
	    .selectAll("path")
	      .data(topojson.object(mx, mx.objects.municipalities).geometries)
	    .enter().append("path")
	      .attr("d", path)
	      .attr("id", function(d){
	      	if (String(d.properties.mun_code).length == 1) {d.properties.mun_code = "00"+String(d.properties.mun_code);}
	      	else 
	      	if (String(d.properties.mun_code).length == 2) { console.log('si'); d.properties.mun_code = "0"+String(d.properties.mun_code); }
	       	else d.properties.mun_code= String(d.properties.mun_code);
	      	
	      	console.log(d.properties.state_code + d.properties.mun_code);
	      	return "mun_"+String(d.properties.state_code) + d.properties.mun_code;

	      })
	      .attr("fill", function(d){
	      //console.log(d);			      	
		  return color(densidad[parseInt(d.properties.state_code)].pob);
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

	    	for( i in densidad){
	    	console.log(densidad[i]);
	    	d3.selectAll('#mun_'+densidad[i].municipality)
	    		.attr('fill',function(d){
	    			return color(densidad[i].margination);
	    		});
	    }



    	});
	});
}

function urban_pop_fem(){
var g = svg.append("g");
var color = d3.scale.linear()
	.domain([2,500000])
	.range(["#fff5f0","#67000d"]);

d3.csv("Mapa/data_map.csv", function(densidad){
	console.log(densidad);
	d3.json("Mapa/mx.json", function(error, mx){
		//console.log(mx);
		g.append("g")
	      .attr("id", "states")
	    .selectAll("path")
	      .data(topojson.object(mx, mx.objects.municipalities).geometries)
	    .enter().append("path")
	      .attr("d", path)
	      .attr("id", function(d){
	      	if (String(d.properties.mun_code).length == 1) {d.properties.mun_code = "00"+String(d.properties.mun_code);}
	      	else 
	      	if (String(d.properties.mun_code).length == 2) { console.log('si'); d.properties.mun_code = "0"+String(d.properties.mun_code); }
	       	else d.properties.mun_code= String(d.properties.mun_code);
	      	
	      	console.log(d.properties.state_code + d.properties.mun_code);
	      	return "mun_"+String(d.properties.state_code) + d.properties.mun_code;

	      })
	      .attr("fill", function(d){
	      //console.log(d);			      	
		  return color(densidad[parseInt(d.properties.state_code)].pob);
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

	    	for( i in densidad){
	    	console.log(densidad[i]);
	    	d3.selectAll('#mun_'+densidad[i].municipality)
	    		.attr('fill',function(d){
	    			return color(densidad[i].urban_pop_fem);
	    		});
	    }



    	});
	});
}





/*TASA DE MORTALIDAD*/
function cargarTmortalidad(){
var g = svg.append("g");
var color = d3.scale.linear()
	.domain([-2,5])
	.range(["#ffffcc","#800026"]);

d3.csv("Mapa/tmortalidad.csv", function(densidad){
	console.log(densidad);
	d3.json("Mapa/mx.json", function(error, mx){
		console.log(mx);
		g.append("g")
	      .attr("id", "states")
	    .selectAll("path")
	      .data(topojson.object(mx, mx.objects.municipalities).geometries)
	    .enter().append("path")
	      .attr("d", path)
	      .attr("fill", function(d){			      	
		  return color(densidad[parseInt(d.properties.state_code)].pob);
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
}

/*TASA DE MORTALIDAD RURAL*/
function cargarTmortalidadRural(){
var g = svg.append("g");
var color = d3.scale.linear()
	.domain([0,90])
	.range(["yellow","red"]);

d3.csv("Mapa/mortalidadRural.csv", function(densidad){
	console.log(densidad);
	d3.json("Mapa/mx.json", function(error, mx){
		console.log(mx);
		g.append("g")
	      .attr("id", "states")
	    .selectAll("path")
	      .data(topojson.object(mx, mx.objects.municipalities).geometries)
	    .enter().append("path")
	      .attr("d", path)
	      .attr("fill", function(d){			      	
		  return color(densidad[parseInt(d.properties.state_code)].pob);
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
}
