var w = 500,
	h = 500;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = ['Variables que influyen fuertemente en la probabilidad de morir durante el parto',
					'Modelo de predicción 1',
					'Modelo de predicción 2'
					];
/*
RESULTADOS
pct_fem_primary_degree	985.95
pct_single	782.86
avg_prenatal_consults	698.74
avg_children_born	632.93
insurance_none	604.5
pct_born_here	582.47     ???
margination	580.52
pct_disabilies	563.64
attended_birth_doctor	537.77
prenatal_yes	515.99

MODELO 1
pct_disabilies	2398.23
avg_prenatal_consults	606.02
urban_loc_distance	431.57
urban_clue_distance	391.13
margination	233.25
pct_fem_no_school	223.68
pct_entitled_health_serv	165.67
rural_basico_distance	164.36
urban_pop_fem	160.25
birth_procedure_cesarean	156.83

MODELO 2
pct_disabilies	2398.23
avg_prenatal_consults	606.02
urban_loc_distance	431.57
urban_clue_distance	391.13
margination	233.25
pct_fem_no_school	223.68
pct_entitled_health_serv	165.67
rural_basico_distance	164.36
urban_pop_fem	160.25
birth_procedure_cesarean	156.


CORRECTAS
pct_fem_primary_degree	985.95
pct_single	782.86
avg_prenatal_consults	698.74
avg_children_born	632.93
insurance_none	604.5
pct_born_here	582.47
margination	580.52
pct_disabilies	563.64
attended_birth_doctor	537.77
prenatal_yes	515.99
pct_entitled_health_serv	511.55
birth_procedure_cesarean	404.56
pct_imss_insured	363.97

*/

//Data
var d = [
		  [
			{axis:"Sólo educación primaria",value:985.95},
			{axis:"Solteras",value:782.86},
			{axis:"Promedio de consultas prenatales",value: 698.74},
			{axis:"Promedio de niños nacidos",value:632.93},
			{axis:"Derechohabiencia",value:604.5},
			{axis:"Nacimientos en la localidad",value:582.47},
			{axis:"Marginación",value:580.52},
			{axis:"Discapacidad",value:563.64},
			{axis:"Atención de un médico durante el parto",value:515.99},
			{axis:"Con consultas prenatales",value:511.55},
			{axis:"Parto con cesárea",value:404.56},
			{axis:"Aseguradas del IMSSS",value:363.97}
		  ]/*,[
			{axis:"Porcentaje de muejres con discapacidad", value:2398.23},
			{axis:"Promedio de consultas prenatales", value:606.02},
			{axis:"Distancia al hospital en zonas urbanas", value:431.57},
			{axis:"urban_clue_distance", value:391.13},
			{axis:"Índice de marginación", value:233.25},
			{axis:"Porcentaje de mujeres sin acceso a la educación", value:223.68},
			{axis:"Porcentaje de derechohabientes", value:165.67},
			{axis:"rural_basico_distance", value:164.36},
			{axis:"Población femenina en zonas urbanas", value:160.25},
			{axis:"Cesárea durante el parto", value:156.83}
		  ],[
			{axis:"Distancia al hospital en zonas urbanas", value:4746.39},
			{axis:"urban_clue_distance", value:3854.58},
			{axis:"Promedio de consultas prenatales", value:1385.27},
			{axis:"Porcentaje de mujeres con educación primaria", value:1225.18},
			{axis:"urban_basico_distance", value:1221.21},
			{axis:"Porcentaje de niños nacidos", value:1175.1},
			{axis:"Porcentaje de muejres con discapacidad", value:1084.84},
			{axis:"Muejeres con médico familiar", value:981.54},
			{axis:"clue_distance", value:934.28},
			{axis:"Mujeres sin seguro médico", value:845.55}
		  ],[
			{axis:"", value:},
			{axis:"", value:},
			{axis:"", value:},
			{axis:"", value:},
			{axis:"", value:},
			{axis:"", value:},
			{axis:"", value:},
			{axis:"", value:},
			{axis:"", value:},
			{axis:"", value:},
		  ],[
			{axis:"Email",value:0.48},
			{axis:"Social Networks",value:0.41},
			{axis:"Internet Banking",value:0.27},
			{axis:"News Sportsites",value:0.28},
			{axis:"Search Engine",value:0.46},
			{axis:"View Shopping sites",value:0.29},
			{axis:"Paying Online",value:0.11},
			{axis:"Buy Online",value:0.14},
			{axis:"Stream Music",value:0.05},
			{axis:"Online Gaming",value:0.19},
			{axis:"Navigation",value:0.14},
			{axis:"App connected to TV program",value:0.06},
			{axis:"Offline Gaming",value:0.24},
			{axis:"Photo Video",value:0.17},
			{axis:"Reading",value:0.15},
			{axis:"Listen Music",value:0.12},
			{axis:"Watch TV",value:0.1},
			{axis:"TV Movies Streaming",value:0.14},
			{axis:"Listen Radio",value:0.06},
			{axis:"Sending Money",value:0.16},
			{axis:"Other",value:0.07},
			{axis:"Use less Once week",value:0.17}
		  ]*/
		];

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 1000,
  levels: 6,
  ExtraWidthX: 300
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw("#spider", d, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#cota')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)

//Create the title for the legend
var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)') 
	.attr("x", w - 70)
	.attr("y", 10)
	.attr("font-size", "12px")
	.attr("fill", "#404040")
	.text("What % of owners use a specific service in a week");
		
//Initiate Legend	
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)') 
	;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;	