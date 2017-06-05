var obtenerUbicacion = function (e) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrarPosicion);
    } else {
        alert("Actualice su navegador");
    }
};
var mostrarPosicion = function (posicion) {
    var coordenadas = {
        lat: posicion.coords.latitude,
        lng: posicion.coords.longitude
    };
    mostrarMapa(coordenadas);
};
var mostrarMapa = function (coordenadas) {
    var map = new google.maps.Map($('.mapa')[0], {
      zoom: 15,
      center: coordenadas
    });
    var marker = new google.maps.Marker({
      position: coordenadas,
      map: map
    });
}

var restaurantes = [
	{
		"nombre": "Pizzas del Perro Negro",
		"comida": "Pizzas",
		"foto": "assets/img/pizza.jpg",
		"direccion": "Calle Orizaba 4, Local B, Cuauhtémoc, Roma Norte, 06700 Ciudad de México, CDMX"
	},
	{
		"nombre": "Papa Guapa",
		"comida": "Papas",
		"foto": "assets/img/papa.jpg",
		"direccion": "Calle Orizaba 4, Local B, Cuauhtémoc, Roma Norte, 06700 Ciudad de México, CDMX"
	},
	{
		"nombre": "Barracuda Dinner",
		"comida": "Hamburguesas",
		"foto": "assets/img/barracuda.jpg",
		"direccion": "Av Nuevo León 4-A, Condesa, Cuauhtémoc, 06140 Ciudad de México, CDMX."
	},
	{
		"nombre": "Moshi Moshi",
		"comida": "Sushi",
		"foto": "assets/img/moshi.jpg",
		"direccion": "Plaza Villa de Madrid 22, Cuauhtémoc, Roma, 06700 Ciudad de México, CDMX."
	},
	{
		"nombre": "Churrería El Moro",
		"comida": "Churros y chocolate",
		"foto": "assets/img/churros.jpg",
		"direccion": "Eje Central Lázaro Cárdenas 42, Centro Histórico, Centro, 06000 Ciudad de México, CDMX"
	}
];

var plantillaRestaurantes = "<article class='row'>"+
			"<div class='card-panel indigo lighten-5 z-depth-1 col m8 s12 offset-m2'>"+
				"<div class='row valign-wrapper'>" +
					"<div class='col s3'>"+
						"<img src='__foto__' alt='Contact' class='fotoRestaurante responsive-img'>"+
						"</div>"+
						"<div class='col s8 color-gray'>"+
							"<h4>__nombre__</h4>"+
							"<h6>__comida__</h6>"+
							"<h6>__direccion__</h6>"+
						"</div>"+
					"</div>"+
				"</div>"+
			"</article>";

var cargarPagina = function () {
	$("#search-form").submit(filtrarRestaurantes);
};

var filtrarRestaurantes = function (e) {
	e.preventDefault();
	var busqueda = $("#search").val().toLowerCase();
	var nombreFiltrados = restaurantes.filter(function (restaurante) {
		return restaurante.nombre.toLowerCase().indexOf(busqueda) >= 0;
	});
	// var comidaFiltrados = restaurantes.filter(function (restaurante) {
	// 	return restaurante.comida.toLowerCase().indexOf(busqueda) >= 0;
	// });
	mostrarRestaurantes(nombreFiltrados);
	// mostrarRestaurantes(comidaFiltrados);
};

var mostrarRestaurantes = function (restaurantes) {
var plantillaFinal = "";
restaurantes.forEach(function (restaurante) {
	plantillaFinal += plantillaRestaurantes.replace("__nombre__", restaurante.nombre)
		.replace("__comida__", restaurante.comida)
		.replace("__foto__", restaurante.foto)
		.replace("__direccion__", restaurante.direccion);
});
$(".contenedor-restaurantes").html(plantillaFinal);
};


$(document).ready(cargarPagina);
