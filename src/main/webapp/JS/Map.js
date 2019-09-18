var map;

function initMap() {
 var map = new google.maps.Map(document.getElementById('map'), {
 zoom: 15,
 center : {lat:46.769459, lng:23.589889},
 mapTypeControl: true,
 mapTypeControlOptions: {
	style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
	position: google.maps.ControlPosition.TOP_CENTER
 },
 zoomControl: true,
 zoomControlOptions: {
	 position: google.maps.ControlPosition.RIGHT_BOTTOM
 },
 scaleControl: true,
 streetViewControl: true,
 streetViewControlOptions: {
	position: google.maps.ControlPosition.RIGHT_BOTTOM
 },
 fullscreenControl: true
 });
 var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }



function setMarkers(map) {
 var image = {
 url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png',
 size: new google.maps.Size(32,32),
 origin: new google.maps.Point(0, 0),
 anchor: new google.maps.Point(0, 32)
 };
 var shape = {
	coords: [1, 1, 1, 20, 18, 20, 18, 1],
	type: 'poly'
 };
 
 
map.addListener('center_changed', function() {
   /// alert(map.getBounds());
   var bounds =  map.getBounds();
   var ne = bounds.getNorthEast();
   var sw = bounds.getSouthWest();
 var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {
   ///console.log(JSON.parse(xhttp.responseText).name);
   var data = JSON.parse(xhttp.responseText);
   var i;
   console.log(Object.keys(data).length);
   for (i=0;i<=Object.keys(data).length;i++)
   {
   	var marker = new google.maps.Marker({
   		position: {lat:data[i].lat, lng: data[i].lng},
   		map: map,
   		icon: image,
   		shape: shape,
   		title:""+data[i].id+""}).addListener('click', function(marker){

        gettitle(parseInt(this.getTitle()));
       });
   }
 }
 };
 xhttp.open("GET", "http://localhost:8080/efind-0.0.1/getPointeri?lats="+ne.lat()+"&lngs="+ne.lng()+"&latj="+sw.lat()+"&lngj="+sw.lng(), true);
 xhttp.send();
 });
}
