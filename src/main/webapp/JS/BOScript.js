var allOutletsButton = document.getElementById("allOutletsButton");
var pendingOutletsButton = document.getElementById("pendingOutletsButton");
var badOutletsButton = document.getElementById("badOutletsButton");
var inactiveOutletsButton = document.getElementById("inactiveOutletsButton");
var list = document.getElementById("list");

allOutletsButton.addEventListener("click", createAllListComponent);
pendingOutletsButton.addEventListener("click", createPendingListComponent);
badOutletsButton.addEventListener("click", createBadListComponent);
inactiveOutletsButton.addEventListener("click", createInactiveListComponent);

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

function editButtonClickable(editButton, id) {
	editButton.addEventListener("click", function(){
		var cover = document.createElement("div");
		cover.id = "cover";
		document.body.appendChild(cover);
		var dialogBox = document.createElement("div");
		dialogBox.id = "editdialogbox";
		document.body.appendChild(dialogBox);
		var editName = document.createElement("div");
		editName.id = "editname";
		editName.innerHTML += "Name:";
		dialogBox.appendChild(editName);
		var editAdress = document.createElement("div");
		editAdress.id = "editadress";
		editAdress.innerHTML += "Adress:";
		dialogBox.appendChild(editAdress);
		var editType = document.createElement("div");
		editType.id = "edittype";
		editType.innerHTML += "Type:";
		dialogBox.appendChild(editType);
		var topside = document.createElement("div");
		topside.id = "edittopside";
		dialogBox.appendChild(topside);
		var exitButton = document.createElement("div");
		exitButton.id = "editexit";
		exitButton.addEventListener("click" , function(){
			document.body.removeChild(dialogBox);
			document.body.removeChild(cover);
		});
		topside.appendChild(exitButton);
		var nameInput = document.createElement("input");
		nameInput.id = "nameinput";
		dialogBox.appendChild(nameInput);
		var adressInput = document.createElement("input");
		adressInput.id = "adressinput";
		dialogBox.appendChild(adressInput);
		var typeSelect = document.createElement("select");
		typeSelect.id = "typeselect";
		var opt1 = document.createElement("option");
		opt1.text = "1";
		opt1.value = 1;
		typeSelect.add(opt1);
		var opt2 = document.createElement("option");
		opt2.text = "2";
		opt2.value = 2;
		typeSelect.add(opt2);
		var opt3 = document.createElement("option");
		opt3.text = "3";
		opt3.value = 3;
		typeSelect.add(opt3);
		var opt4 = document.createElement("option");
		opt4.text = "4";
		opt4.value = 4;
		typeSelect.add(opt4);
		var opt5 = document.createElement("option");
		opt5.text = "5";
		opt5.value = 5;
		typeSelect.add(opt5);
		dialogBox.appendChild(typeSelect);
		var saveButton = document.createElement("div");
		saveButton.id = "savebutton";
		saveButton.innerHTML += "SAVE";
		saveButton.addEventListener("click", function(){
			var httpreq = new XMLHttpRequest();
			httpreq.open("GET", "http://localhost:8080/efind-0.0.1/update?nume='"+nameInput.value+"'&tip="+typeSelect.value+"&descriere='"+adressInput.value+"'&id="+id, true);
			httpreq.send();
			console.log(nameInput.value, adressInput.value, typeSelect.value, id);
			location.reload();
		});
		dialogBox.appendChild(saveButton);
	});
}

function outletIconClickable(outletIcon, lati, lngi) {
	outletIcon.addEventListener("click", function(){
		window.open("http://www.google.com/maps/?q="+lati+","+lngi, '_blank');
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
	inactiveOutletsButton.style.backgroundColor = 'transparent';
	for(i=0; i<=arrayOfOutlets.length; i++){
		if(arrayOfOutlets[i].status == 2) {
			var outletComponent = document.createElement('div');
			outletComponent.className = "outletcomponent";
			var outletIcon = document.createElement('div');
			outletIcon.className = "basicoutlet";
			var lati = arrayOfOutlets[i].lat;
			var lngi = arrayOfOutlets[i].lng;
			outletIconClickable(outletIcon, lati, lngi);
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
			var oid = arrayOfOutlets[i].id;
			editButtonClickable(editButton, oid);
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
	inactiveOutletsButton.style.backgroundColor= 'transparent';
	for(i=0;i<=arrayOfOutlets.length;i++){
		if(arrayOfOutlets[i].status == 1){
			var outletComponent = document.createElement('div');
			outletComponent.className = "outletcomponent";
			var outletIcon = document.createElement('div');
			outletIcon.className = "basicoutlet";
			var lati = Math.floor(arrayOfOutlets[i].lat * 100000) / 100000;
			var lngi = Math.floor(arrayOfOutlets[i].lng * 100000) / 100000;
			outletIconClickable(outletIcon, lati, lngi);
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
	inactiveOutletsButton.style.backgroundColor = "transparent";
	for(i=0;i<=arrayOfOutlets.length;i++){
		if(arrayOfOutlets[i].reports != 0 && arrayOfOutlets[i].status != 0){
			var outletComponent = document.createElement('div');
			outletComponent.className = "outletcomponent";
			var outletIcon = document.createElement('div');
			outletIcon.className = "basicoutlet";
			var lati = Math.floor(arrayOfOutlets[i].lat * 100000) / 100000;
			var lngi = Math.floor(arrayOfOutlets[i].lng * 100000) / 100000;
			outletIconClickable(outletIcon, lati, lngi);
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

function createInactiveListComponent() {
	var component = list.lastElementChild;
	while(component) {
		component.remove();
		component = list.lastElementChild;
	}
	allOutletsButton.style.backgroundColor = 'transparent';
	pendingOutletsButton.style.backgroundColor = 'transparent';
	badOutletsButton.style.backgroundColor = 'transparent';
	inactiveOutletsButton.style.backgroundColor = '#999999';
	for(i=0;i<=arrayOfOutlets.length;i++){
		if(arrayOfOutlets[i].status == 0){
			var outletComponent = document.createElement('div');
			outletComponent.className = "outletcomponent";
			var outletIcon = document.createElement('div');
			outletIcon.className = "basicoutlet";
			var lati = Math.floor(arrayOfOutlets[i].lat * 100000) / 100000;
			var lngi = Math.floor(arrayOfOutlets[i].lng * 100000) / 100000;
			outletIconClickable(outletIcon, lati, lngi);
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
			list.appendChild(outletComponent);
		}
	}
}

createAllListComponent();