var allOutletsButton = document.getElementById("allOutletsButton");
var pendingOutletsButton = document.getElementById("pendingOutletsButton");
var badOutletsButton = document.getElementById("badOutletsButton");
var list = document.getElementById("list");

function createAllListComponent() {
	var listComponent = document.createElement("div");
	listComponent.className = "outletcomponent";
	var outletIcon = document.createElement("div");
	outletIcon.className = "basicoutlet";
	listComponent.appendChild(outletIcon);
	var latitudeText = document.createElement("div");
	latitudeText.className = "latitudetext";
	latitudeText.innerHTML += "Latitude: ";
	listComponent.appendChild(latitudeText);
	var longitudeText = document.createElement("div");
	longitudeText.className = "longitudetext";
	longitudeText.innerHTML += "Longitude: ";
	listComponent.appendChild(longitudeText);
	var longitude = document.createElement("div");
	longitude.className = "longitude";
	longitude.innerHTML += "coordinates";
	listComponent.appendChild(longitude);
	var latitude = document.createElement("div");
	latitude.className = "latitude";
	latitude.innerHTML += "coordinates";
	listComponent.appendChild(latitude);
	var  name = document.createElement("div");
	name.className = "name";
	name.innerHTML += "DEMO PENTRU ALL OUTLETS";
	listComponent.appendChild(name);
	var adressText = document.createElement("div");
	adressText.className = "adresstext";
	adressText.innerHTML += "Adress: ";
	listComponent.appendChild(adressText);
	var adress = document.createElement("div");
	adress.className = "adress";
	adress.innerHTML += "Str. Observatorului, nr. 14";
	listComponent.appendChild(adress);
	var editButton = document.createElement("div");
	editButton.className = "editbutton";
	editButton.innerHTML += "EDIT";
	listComponent.appendChild(editButton);
	list.appendChild(listComponent);
}


createAllListComponent();
createAllListComponent();


