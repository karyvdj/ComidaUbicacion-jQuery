var cargarPagina = function () {
	$("#formulario-busqueda").submit(filtrarRestaurantes);
  $(document).on("click", ".ubicacion-restaurante",cambiarUbicacion);
  mostrarRestaurantes(restaurantes);
};

var obtenerUbicacion = function (e) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrarPosicion);
    } else {
        alert("Actualice su navegador");
    }
};

var mostrarPosicion = function (posicion) {
    var misCoordenadas = {
        lat: posicion.coords.latitude,
        lng: posicion.coords.longitude
    };
    mostrarMapa(misCoordenadas);
};

var mostrarMapa = function (coordenadas) {
    var mapa = new google.maps.Map($('.mapa')[0], {
      zoom: 18,
      center: coordenadas
    });
    var marcadorPosicion = new google.maps.Marker({
      position: coordenadas,
      map: mapa
    });
}

var cambiarUbicacion = function () {
  var longitud = $(this).data("longitud");
  var latitud = $(this).data("latitud");

  var coordenadas = {
    lat: latitud,
    lng: longitud
  };

  mostrarMapa(coordenadas);
}

var restaurantes = [
	{
		"nombre": "Pizzas del Perro Negro",
		"comida": "Pizzas",
		"foto": "assets/img/pizza.jpg",
		"direccion": "Calle Orizaba 4, Local B, Cuauhtémoc, Roma Norte, 06700 Ciudad de México, CDMX",
    "coordenadas" : {"lat":"19.416512" ,"lng": "-99.169656"}
	},
	{
		"nombre": "Papa Guapa",
		"comida": "Papas",
		"foto": "assets/img/papa.jpg",
		"direccion": "Calle Orizaba 4, Local B, Cuauhtémoc, Roma Norte, 06700 Ciudad de México, CDMX",
    "coordenadas" : {"lat":"19.419013" ,"lng": "-99.166943"}
	},
	{
		"nombre": "Barracuda Dinner",
		"comida": "Hamburguesas",
		"foto": "assets/img/barracuda.jpg",
		"direccion": "Av Nuevo León 4-A, Condesa, Cuauhtémoc, 06140 Ciudad de México, CDMX.",
    "coordenadas" : {"lat":"19.415995" ,"lng": "-99.169623"}
	},
	{
		"nombre": "Moshi Moshi",
		"comida": "Sushi",
		"foto": "assets/img/moshi.jpg",
		"direccion": "Plaza Villa de Madrid 22, Cuauhtémoc, Roma, 06700 Ciudad de México, CDMX.",
    "coordenadas" : {"lat":"19.419407" ,"lng": "-99.166622"}
	},
	{
		"nombre": "Churrería El Moro",
		"comida": "Churros y chocolate",
		"foto": "assets/img/churros.jpg",
		"direccion": "Eje Central Lázaro Cárdenas 42, Centro Histórico, Centro, 06000 Ciudad de México, CDMX",
    "coordenadas" : {"lat":"19.431437" ,"lng": "-99.141112"}
  }
];

var plantillaRestaurantes = "<article class='row'>"+
			"<div class='card-panel indigo lighten-5 z-depth-1 col m8 offset-m2'>"+
				"<div class='row valign-wrapper'>" +
					"<div class='col s3'>"+
						"<img src='__foto__' alt='Contact' class='fotoRestaurante responsive-img'>"+
						"</div>"+
						"<div class='col s8 color-gray'>"+
							"<h4>__nombre__</h4>"+
							"<h6>__comida__</h6>"+
							"<h6>__direccion__</h6>"+
              "<a href='#mapa' class='btn-floating btn-small waves-effect waves-light orange ubicacion-restaurante' data-latitud ='__latitud__' data-longitud = '__longitud__'>" +
                "<i class='material-icons'>place</i>" +
              "</a>" +
						"</div>"+
					"</div>"+
				"</div>"+
			"</article>";

var mostrarRestaurantes = function (restaurantes) {
  var plantillaFinal = "";
  restaurantes.forEach(function (restaurante) {
  	plantillaFinal += plantillaRestaurantes.replace("__nombre__", restaurante.nombre)
      .replace("__latitud__", restaurante.coordenadas.lat)
      .replace("__longitud__", restaurante.coordenadas.lng)
  		.replace("__comida__", restaurante.comida)
  		.replace("__foto__", restaurante.foto)
  		.replace("__direccion__", restaurante.direccion);
  });
  $(".contenedor-restaurantes").html(plantillaFinal);
};

var filtrarRestaurantes = function (e) {
	e.preventDefault();
	var busqueda = $("#buscar").val().toLowerCase();
	var nombreFiltrados = restaurantes.filter(function (restaurante) {
		return restaurante.nombre.toLowerCase().indexOf(busqueda) >= 0;
	});
	// var comidaFiltrados = restaurantes.filter(function (restaurante) {
	// 	return restaurante.comida.toLowerCase().indexOf(busqueda) >= 0;
	// });
	mostrarRestaurantes(nombreFiltrados);
	// mostrarRestaurantes(comidaFiltrados);
};

$(document).ready(cargarPagina);
