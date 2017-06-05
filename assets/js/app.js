function initMap(){

    var laboratoriaMexico = {lat: 19.4176437, lng: -99.167004};

    var map = new google.maps.Map(document.getElementById('mapa'),{
    zoom: 18,
    center:laboratoriaMexico
    });
		
		var marker = new google.maps.Marker({
		 position:laboratoriaMexico,
		 map: map
	 });
}
