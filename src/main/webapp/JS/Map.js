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
	map.addListener('center_changed', function() {
   /// alert(map.getBounds());
   var bounds =  map.getBounds();
   var ne = bounds.getNorthEast();
   var sw = bounds.getSouthWest();
 var xhttp = new XMLHttpRequest();
 xhttp.open("GET", "http://localhost:8080/efind-0.0.1/getPointeri?lats="+ne.lat()+"&lngs="+ne.lng()+"&latj="+sw.lat()+"&lngj="+sw.lng(), true);
 xhttp.send();
  xhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {
   ///console.log(JSON.parse(xhttp.responseText).name);
   var data = JSON.parse(xhttp.responseText);
   var i;
   var iconBase='img/';
   console.log(Object.keys(data).length);
   for (i=0;i<=Object.keys(data).length;i++)
   {
	  if(data[i].tip == 1)
		  var image = {
    url: "img/USB.png", // url
    scaledSize: new google.maps.Size(40, 45), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(40, 45) // anchor
};
	  else if(data[i].tip == 2)
		  var image = {
    url: "img/Car.png", // url
    scaledSize: new google.maps.Size(40, 45), // scaled size
    origin: new google.maps.Point(0,0), // origin
		  anchor: new google.maps.Point(40, 45)}; // anchor
	  else if(data[i].tip == 3)
		  var image = {
    url: "img/Grounded outlet.png", // url
    scaledSize: new google.maps.Size(40, 45), // scaled size
    origin: new google.maps.Point(0,0), // origin
		  anchor: new google.maps.Point(40, 45)};
	  else if(data[i].tip == 4)
		  var image = {
    url: "img/Ungrounded outlet.png", // url
    scaledSize: new google.maps.Size(40, 45), // scaled size
    origin: new google.maps.Point(0,0), // origin
		  anchor: new google.maps.Point(40, 45)};
	  else
		  var image = {
    url: "img/Wireless.png", // url
    scaledSize: new google.maps.Size(40, 45), // scaled size
    origin: new google.maps.Point(0,0), // origin
		  anchor: new google.maps.Point(40, 45)};
   	var marker = new google.maps.Marker({
   		position: {lat:data[i].lat, lng: data[i].lng},
		icon: image,
   		map: map,
   		title:""+data[i].name+""}).addListener('click', function(marker){
        gettitle(parseInt(this.getTitle()));
       });
   }
 }
 };
 
 });
}

function Priza(id,name,type,description,lat,lng,status,reports,totalOutlets,occupiedOutlets,favorite,closeTime,isFree) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.description = description;
		this.lat = lat;
		this.lng = lng;
		this.status = status;
		this.reports = reports;
		this.totalOutlets = totalOutlets;
		this.occupiedOutlets = occupiedOutlets;
		this.favorite = favorite;
		this.closeTime = closeTime;
		this.isFree = isFree;
}

var arrayOfOutlets = new Array();



var xhttp = new XMLHttpRequest();
xhttp.open("GET", "http://localhost:8080/efind-0.0.1/getBackOfficeData",true);
xhttp.send();
xhttp.onreadystatechange = function(){
	if (this.readyState == 4 && this.status == 200){
	var data = JSON.parse(this.responseText);
	data.forEach(element => {
		let priza = new Priza(element.id, element.name, element.tip, element.descriere, element.lat, element.lng, element.pending, element.reports, element.total_prize, element.prize_ocupate, element.favorite, element.ora_inchidere);
		arrayOfOutlets.push(priza);
	});
	addElementsToList();
	}
}



function addElementsToList(){
	var list = document.getElementById("list");
	for(i=0;i<=arrayOfOutlets.length-1;i++){
		var component = document.createElement('div');
		component.className='component';
		list.appendChild(component);
		var cImage = document.createElement('div');
		cImage.className = 'image';
		component.appendChild(cImage);
		var locationName = document.createElement('div');
		locationName.className = 'locationName';
		locationName.innerHTML += arrayOfOutlets[i].name;
		component.appendChild(locationName);
		var starIcon = document.createElement('div');
		starIcon.className = 'starIcon';
		component.appendChild(starIcon);
		var rating = document.createElement('div');
		rating.className = 'rating';
		rating.innerHTML += '4.5';
		component.appendChild(rating);
		var reviews = document.createElement('div');
		reviews.className = 'reviews';
		reviews.innerHTML += '(10 reviews)';
		component.appendChild(reviews);
		var address = document.createElement('div');
		address.className = 'address';
		address.innerHTML += 'Lorem Ipsum dolor sit amet';
		component.appendChild(address);
		var closingTime = document.createElement('div');
		closingTime.className = 'closingTime';
		closingTime.innerHTML += arrayOfOutlets[i].closeTime;
		component.appendChild(closingTime);
		var powerIcon = document.createElement('div');
		powerIcon.className = 'powerIcon';
		component.appendChild(powerIcon);
		var avaliableNumber = document.createElement('div');
		avaliableNumber.className = 'avaliableNumber';
		avaliableNumber.innerHTML += arrayOfOutlets[i].occupiedOutlets;
		component.appendChild(avaliableNumber);
		var totalNumber = document.createElement('div');
		totalNumber.className = 'totalNumber';
		totalNumber.innerHTML += '/' + arrayOfOutlets[i].totalOutlets + ' avaliable';
		component.appendChild(totalNumber);
		
	}
}

var searchButton=document.getElementById("directions");
searchButton.onclick = function(){
	var input = document.getElementById('pac-input');

	google.maps.event.trigger(input, 'focus', {});
    google.maps.event.trigger(input, 'keydown', { keyCode: 13 });
    google.maps.event.trigger(this, 'focus', {});
}
