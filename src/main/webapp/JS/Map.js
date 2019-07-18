var map;
function MarkerControl(controlDiv, map) {
var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to add a pointer';
        controlDiv.appendChild(controlUI);


var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Add Marker';
        controlUI.appendChild(controlText);
	controlUI.addEventListener('click', function() {
		var marker = new google.maps.Marker({
			position: {lat:46.750380, lng:23.580522},
			map: map,
			title: 'New Pointer'
		});
	});
}

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
 map.addListener('center_changed', function() {
   /// alert(map.getBounds());
   var bounds =  map.getBounds();
   var ne = bounds.getNorthEast();
   var sw = bounds.getSouthWest();
   console.log(ne.lat() + " " + ne.lng());


   });
 setMarkers(map);
 var markerControlDiv = document.createElement('div');
 var markerControl = new MarkerControl(markerControlDiv, map);
 markerControlDiv.index = 1;
 map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(markerControlDiv);
}
var neighborhoods = [
 ['Zorilor', 46.754922, 23.587724, 10],
 ['Manastur', 46.753040, 23.556376, 10],
 ['Marasti', 46.780951, 23.612862, 10],
 ['Gheorgheni', 46.767847, 23.625058, 10],
 ['Intre Lacuri', 46.776436, 23.632468, 10],
 ['Bulgaria?', 46.787858, 23.620713, 10],
 ['Iris', 46.794947, 23.617475, 10],
 ['Centru', 46.769113, 23.589058, 10],
 ['Grigorescu', 46.770728, 23.565168, 10],
 ['Gruia', 46.777676, 23.578643, 10],
 ['Dambul Rotund', 46.784702, 23.568945, 10]
];

var Info = ["Priza123", "Strada Mea", "Cluj Napoca", "Aici ii descriere"];


function gettitle(marker)
{
  document.getElementById('imagine').style.background = "url('img/cluj-image.webp') no-repeat";
  document.getElementById('imagine').style.backgroundSize = "100% 110%";
  document.getElementById('TipuPrizei').style.background = "url('img/outletType.png') no-repeat";
  document.getElementById('TipuPrizei').style.backgroundSize = "100% 100%";
  document.getElementById('TipuPrizei').innerHTML = " ";
  document.getElementById('sectiune').style.zIndex = 1;
  document.getElementById('NumeLocal').innerHTML = Info[0];
  document.getElementById('NumeStrada').innerHTML = Info[1] + ", " + Info[2];
  document.getElementById('NumeStrada').innerHTML = Info[1] + ", " + Info[2];
  document.getElementById('DescrierePriza').innerHTML = Info[3];
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
     var neighborhood = neighborhoods[i];
   	var marker = new google.maps.Marker({
   		position: {lat:data[i].lat, lng: data[i].lng},
   		map: map,
   		icon: image,
   		shape: shape})
   }
 }
 };
 xhttp.open("GET", "http://localhost:8080/efind-0.0.1/getPointeri?lats="+ne.lat()+"&lngs="+ne.lng()+"&latj="+sw.lat()+"&lngj="+sw.lng(), true);
 xhttp.send();
 });
 var basicMarker = new google.maps.Marker({
	position: {lat: 46.760639, lng: 23.587515},
	map: map,
	title: 'Gradina Botanica'
 });
}
