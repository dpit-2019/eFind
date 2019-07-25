var allOutletsButton = document.getElementById("allOutletsButton");
var pendingOutletsButton = document.getElementById("pendingOutletsButton");
var badOutletsButton = document.getElementById("badOutletsButton");
var list = document.getElementById("list");

allOutletsButton.addEventListener("click", createAllListComponent);
pendingOutletsButton.addEventListener("click", createPendingListComponent);
badOutletsButton.addEventListener("click", createBadListComponent);

function Priza(id,name,type,description,lat,lng,status,reports) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.description = description;
		this.lat = lat;
		this.lng = lng;
		this.status = status;
		this.reports = reports;
}

var arrayOfOutlets = new Array();

function populateOutletArray() {
	var data = JSON.parse(this.responseText);
	data.forEach(element => {
		let priza = new Priza(element.id, element.name, element.tip, element.descriere, element.lat, element.lng, element.pending, element.reports);
		arrayOfOutlets.push(priza);
	});
}

var request = new XMLHttpRequest();

request.open('GET', 'http://localhost:8080/efind-0.0.1/getBackOfficeData', false);

request.addEventListener("load", populateOutletArray)

request.send();

function pendingCheckmarkClickable(checkmark, oid) {
	checkmark.addEventListener("click", function(){
		var dialog = document.createElement('div');
		dialog.id = "dialogbox";
		dialog.innerHTML = "Add Outlet?";
		
		var dialogcheck = document.createElement('div');
		dialogcheck.id = "dialogcheckmark";
		dialogcheck.addEventListener("click", function(){
			var httpreq = new XMLHttpRequest();
			httpreq.open("GET", "http://localhost:8080/efind-0.0.1/changeStatus?id="+oid+"&status="+2, true);
			httpreq.send();
			document.body.removeChild(cover);
			document.body.removeChild(dialog);
			
			location.reload();
			pendingOutletsButton.click();
		});
	
		var dialogcross = document.createElement('div');
			dialogcross.id = "dialogcrossmark";
			dialogcross.addEventListener("click", function(){
				document.body.removeChild(cover);
				document.body.removeChild(dialog);
		});
	
		var cover = document.createElement('div');
		cover.id = "cover";
		
		dialog.appendChild(dialogcheck);
		dialog.appendChild(dialogcross);
		
		document.body.prepend(dialog);
		document.body.prepend(cover);
	});
}

function pendingCrossmarkClickable(crossmark, pid){
	crossmark.addEventListener("click", function(){
		var dialog = document.createElement('div');
		dialog.id = "dialogbox";
		dialog.innerHTML = "Reject request?";
		
		var dialogcheck = document.createElement('div');
		dialogcheck.id = "dialogcheckmark";
		dialogcheck.addEventListener("click", function(){
			var httpreq = new XMLHttpRequest();
			httpreq.open("GET", "http://localhost:8080/efind-0.0.1/changeStatus?id="+pid+"&status="+0, true);
			httpreq.send();
			document.body.removeChild(cover);
			document.body.removeChild(dialog);
			location.reload();
			pendingOutletsButton.click();
		});
	
		var dialogcross = document.createElement('div');
			dialogcross.id = "dialogcrossmark";
			dialogcross.addEventListener("click", function(){
				document.body.removeChild(cover);
				document.body.removeChild(dialog);
		});
	
		var cover = document.createElement('div');
		cover.id = "cover";
		
		dialog.appendChild(dialogcheck);
		dialog.appendChild(dialogcross);
		
		document.body.prepend(dialog);
		document.body.prepend(cover);
	});
}

function badCheckmarkClickable(checkmark, oid) {
	checkmark.addEventListener("click", function(){
		var dialog = document.createElement('div');
		dialog.id = "dialogbox";
		dialog.innerHTML = "Deactivate Outlet?";
		
		var dialogcheck = document.createElement('div');
		dialogcheck.id = "dialogcheckmark";
		dialogcheck.addEventListener("click", function(){
			var httpreq = new XMLHttpRequest();
			httpreq.open("GET", "http://localhost:8080/efind-0.0.1/changeStatus?id="+oid+"&status="+0, true);
			httpreq.send();
			document.body.removeChild(cover);
			document.body.removeChild(dialog);
			location.reload();
			pendingOutletsButton.click();
		});
	
		var dialogcross = document.createElement('div');
			dialogcross.id = "dialogcrossmark";
			dialogcross.addEventListener("click", function(){
				document.body.removeChild(cover);
				document.body.removeChild(dialog);
		});
	
		var cover = document.createElement('div');
		cover.id = "cover";
		
		dialog.appendChild(dialogcheck);
		dialog.appendChild(dialogcross);
		
		document.body.prepend(dialog);
		document.body.prepend(cover);
	});
}

function createAllListComponent() {
	var component = list.lastElementChild;
	while(component) {
		component.remove();
		component = list.lastElementChild;
	}
	allOutletsButton.style.backgroundColor = "#999999";
	pendingOutletsButton.style.backgroundColor = 'transparent';
	badOutletsButton.style.backgroundColor = 'transparent';
	for(i=0; i<=arrayOfOutlets.length; i++){
		if(arrayOfOutlets[i].status == 2) {
			var outletComponent = document.createElement('div');
			outletComponent.className = "outletcomponent";
			var outletIcon = document.createElement('div');
			outletIcon.className = "basicoutlet";
			outletComponent.appendChild(outletIcon);
			var latText = document.createElement('div');
			latText.className = "latitudetext";
			latText.innerHTML += "Latitude: ";
			outletComponent.appendChild(latText);
			var lngText = document.createElement('div');
			lngText.className = "longitudetext";
			lngText.innerHTML += "Longitude: ";
			outletComponent.appendChild(lngText);
			var lat = document.createElement('div');
			lat.className = "latitude";
			lat.innerHTML += arrayOfOutlets[i].lat;
			outletComponent.appendChild(lat);
			var lng = document.createElement('div');
			lng.className = "longitude";
			lng.innerHTML += arrayOfOutlets[i].lng;
			outletComponent.appendChild(lng);
			var name = document.createElement('div');
			name.className = "name";
			name.innerHTML += arrayOfOutlets[i].name;
			outletComponent.appendChild(name);
			var adressText = document.createElement('div');
			adressText.className = "adresstext";
			adressText.innerHTML += "Adress:";
			outletComponent.appendChild(adressText);
			var adress = document.createElement('div');
			adress.className = "adress";
			adress.innerHTML += arrayOfOutlets[i].description;
			outletComponent.appendChild(adress);
			var editButton = document.createElement('div');
			editButton.className = "editbutton";
			editButton.innerHTML += "EDIT";
			outletComponent.appendChild(editButton);
			list.appendChild(outletComponent);
		}
	}
}

function createPendingListComponent() {
	var component = list.lastElementChild;
	while(component) {
		component.remove();
		component= list.lastElementChild;
	}
	allOutletsButton.style.backgroundColor = 'transparent';
	pendingOutletsButton.style.backgroundColor = '#999999';
	badOutletsButton.style.backgroundColor = 'transparent';
	for(i=0;i<=arrayOfOutlets.length;i++){
		if(arrayOfOutlets[i].status == 1){
			var outletComponent = document.createElement('div');
			outletComponent.className = "outletcomponent";
			var outletIcon = document.createElement('div');
			outletIcon.className = "basicoutlet";
			outletComponent.appendChild(outletIcon);
			var latText = document.createElement('div');
			latText.className = "latitudetext";
			latText.innerHTML += "Latitude: ";
			outletComponent.appendChild(latText);
			var lngText = document.createElement('div');
			lngText.className = "longitudetext";
			lngText.innerHTML += "Longitude: ";
			outletComponent.appendChild(lngText);
			var lat = document.createElement('div');
			lat.className = "latitude";
			lat.innerHTML += arrayOfOutlets[i].lat;
			outletComponent.appendChild(lat);
			var lng = document.createElement('div');
			lng.className = "longitude";
			lng.innerHTML += arrayOfOutlets[i].lng;
			outletComponent.appendChild(lng);
			var name = document.createElement('div');
			name.className = "name";
			name.innerHTML += arrayOfOutlets[i].name;
			outletComponent.appendChild(name);
			var adressText = document.createElement('div');
			adressText.className = "adresstext";
			adressText.innerHTML += "Adress:";
			outletComponent.appendChild(adressText);
			var adress = document.createElement('div');
			adress.className = "adress";
			adress.innerHTML += arrayOfOutlets[i].description;
			outletComponent.appendChild(adress);
			var checkmark = document.createElement('div');
			checkmark.id = "checkmark";
			var oid = arrayOfOutlets[i].id;
			pendingCheckmarkClickable(checkmark,oid);
			outletComponent.appendChild(checkmark);
			var crossmark = document.createElement('div');
			crossmark.id = "crossmark";
			pendingCrossmarkClickable(crossmark,oid);
			outletComponent.appendChild(crossmark);
			list.appendChild(outletComponent);
		}
	}
}

function createBadListComponent() {
	var component = list.lastElementChild;
	while(component) {
		component.remove();
		component = list.lastElementChild;
	}
	allOutletsButton.style.backgroundColor = 'transparent';
	pendingOutletsButton.style.backgroundColor = 'transparent';
	badOutletsButton.style.backgroundColor = '#999999';
	for(i=0;i<=arrayOfOutlets.length;i++){
		if(arrayOfOutlets[i].reports != 0 && arrayOfOutlets[i].status != 0){
			var outletComponent = document.createElement('div');
			outletComponent.className = "outletcomponent";
			var outletIcon = document.createElement('div');
			outletIcon.className = "basicoutlet";
			outletComponent.appendChild(outletIcon);
			var latText = document.createElement('div');
			latText.className = "latitudetext";
			latText.innerHTML += "Latitude: ";
			outletComponent.appendChild(latText);
			var lngText = document.createElement('div');
			lngText.className = "longitudetext";
			lngText.innerHTML += "Longitude: ";
			outletComponent.appendChild(lngText);
			var lat = document.createElement('div');
			lat.className = "latitude";
			lat.innerHTML += arrayOfOutlets[i].lat;
			outletComponent.appendChild(lat);
			var lng = document.createElement('div');
			lng.className = "longitude";
			lng.innerHTML += arrayOfOutlets[i].lng;
			outletComponent.appendChild(lng);
			var name = document.createElement('div');
			name.id = "badname";
			name.innerHTML += arrayOfOutlets[i].name;
			outletComponent.appendChild(name);
			var reportNumber = document.createElement('div');
			reportNumber.id = "reports";
			reportNumber.innerHTML += arrayOfOutlets[i].reports + " reports";
			outletComponent.appendChild(reportNumber);
			var adressText = document.createElement('div');
			adressText.className = "adresstext";
			adressText.innerHTML += "Adress:";
			outletComponent.appendChild(adressText);
			var adress = document.createElement('div');
			adress.className = "adress";
			adress.innerHTML += arrayOfOutlets[i].description;
			outletComponent.appendChild(adress);
			var checkmark = document.createElement('div');
			checkmark.id = "badcheckmark";
			var oid = arrayOfOutlets[i].id;
			badCheckmarkClickable(checkmark, oid);
			outletComponent.appendChild(checkmark);
			
			list.appendChild(outletComponent);
		}
	}
}

createAllListComponent();


