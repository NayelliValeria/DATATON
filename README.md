DATATON
=======

Visualizacion sobre tasas de mortalidad durante la maternidad

<!DOCTYPE html>
<meta charset="utf-8">
<head>

	<title>Mortalidad materna</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" type="text/css" href="/Mapa/style.css">

	<script src="d3/d3.v3.min.js" charset="utf-8"></script>
	<script src="d3/topojson.v0.min.js"></script>

</head>

<body>
	<div id="content">
		<div id="header">TÍTULO</div>
		<div class="content_intro">
			<div class="img_intro">IMAGEN</div>
			<div class="text_intro">TEXTO DE INTRO</div>
		</div>
		<div class="content_intro">
			<div class="img_intro">IMAGEN</div>
			<div class="text_intro">TEXTO DE INTRO</div>
		</div>
		<div class="content_intro">
			<div class="img_intro">IMAGEN</div>
			<div class="text_intro">TEXTO DE INTRO</div>
		</div>
		<div id="content_map">
			<div>
				<div id="menu">
					
					<div class="div_select">
						<labe>Datos generales</label>
						<select class="menu_select" id="general">
							<option>opcion 1</option>
							<option>opcion 2</option>
							<option>opcion 3</option>
						</select>
					</div>

					<div class="div_select">
						<labe>Perfil de la mujer</label>
						<select class="menu_select" id="general">
							<option>opcion 1</option>
							<option>opcion 2</option>
							<option>opcion 3</option>
						</select>
					</div>

					<div class="div_select">
						<labe>Calidad del servicio médico</label>
						<select class="menu_select" id="general">
							<option>opcion 1</option>
							<option>opcion 2</option>
							<option>opcion 3</option>
						</select>
					</div>

				</div>
				<div id="filter">

					<div class="div_select_edo">
						<labe>Estado:</label>
						<select class="menu_select" id="general">
							<option>Edo 1</option>
							<option>Edo 2</option>
							<option>Edo 3</option>
						</select>
					</div>

					<div class="div_select_edo">
						<labe>Municipio:</label>
						<select class="menu_select" id="general">
							<option>Mun 1</option>
							<option>Mun 2</option>
							<option>Mun 3</option>
						</select>
					</div>

				</div>
			</div>
			<div id="map" class="map"></div>
			<div id="info">INFO_MAPA</div>
		</div>
		<div id="content_spider">
			<div id="spider">GRÁFICO DE SPIDER</div>
			<div id="spider_info">INFO DE SPIDER</div>
		</div>
		<div id="footer">footer</div>
	</div>
</body>
<script type="text/javascript" src="Mapa/script_mapa.js"></script>
</html>
