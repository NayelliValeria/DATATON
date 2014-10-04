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
		cargarTmortalidad();
	}

	if( valor== 3){
		cargarTmortalidadRural();
	}
});

function cargarMarginacion(){
$("#graficas").append("<p>Índice de marginación en los municípios</p>");
var g = svg.append("g");
var color = d3.scale.linear()
	.domain([-1,3])
	.range(["yellow","red"]);

d3.csv("/Mapa/marginacion2.csv", function(densidad){
	console.log(densidad);
	d3.json("/Mapa/mx.json", function(error, mx){
		console.log(mx);
		g.append("g")
	      .attr("id", "states")
	    .selectAll("path")
	      .data(topojson.object(mx, mx.objects.municipalities).geometries)
	    .enter().append("path")
	      .attr("d", path)
	      .attr("class", "municipality-boundary")
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

/*TASA DE MORTALIDAD*/
function cargarTmortalidad(){
var g = svg.append("g");
var color = d3.scale.linear()
	.domain([-2,5])
	.range(["#ffffcc","#800026"]);

d3.csv("/Mapa/tmortalidad.csv", function(densidad){
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

d3.csv("/Mapa/mortalidadRural.csv", function(densidad){
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


/************************MUJER*********************
<option value="6">Mujeres solteras</option>
<option value="7">Sólo estudios de primaria</option>
<option value="8">Promedio de consultas prenatales</option>
<option value="9">Derechohabiencia</option>

*/
$( "#mujeres" ).change(function() {
	var valor = $(this).val();
	$("svg").remove();

	svg = d3.select(".map").append("svg")
	.attr({"width": width, "height":height});

	if( valor == 6){
		cargarSingle();
	}
	if( valor== 7){
		cargarTmortalidad();
	}

	if( valor== 8){
		cargarTmortalidadRural();
	}
});

/*SINGLE*/
function cargarSingle(){
var g = svg.append("g");
var color = d3.scale.linear()
	.domain([0,90])
	.range(["yellow","red"]);

d3.csv("/Mapa/single.csv", function(densidad){
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