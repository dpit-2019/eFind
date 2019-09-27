var list = document.getElementById("list");
var allOutletsButton = document.getElementById("allOutletsButton");
var pendingOutletsButton = document.getElementById("pendingOutletsButton");
var badOutletsButton = document.getElementById("badOutletsButton");
var inactiveOutletsButton = document.getElementById("inactiveOutletsButton");

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
xhttp.open("GET", "http://localhost:8080/efind-0.0.1/getBackOfficeData", true);
xhttp.send();
xhttp.onreadystatechange = function(){
	if (this.readyState == 4 && this.status == 200) {
		var data = JSON.parse(xhttp.responseText);
		data.forEach(element =>{
			let priza = new Priza(element.id, element.name, element.tip, element.descriere, element.lat, element.lng, element.pending, element.reports, element.total_prize, element.prize_ocupate, element.favorite, element.ora_inchidere, element.isFree);
			arrayOfOutlets.push(priza);
		});
		createAllOutletsList(0,1);
	}
};

function createAllOutletsList(i, ok){
	
	if(i<=arrayOfOutlets.length-1){
		if(ok==1){
			if(arrayOfOutlets[i].status == 1){
			var component = document.createElement("div");
			component.className = "componentTypeII";
			var checkBox = document.createElement("input");
			checkBox.setAttribute("type", "checkbox");
			checkBox.className = "checkOne";
			component.appendChild(checkBox);
			var icon = document.createElement('div');
			icon.className = "iconUngr";
			if(arrayOfOutlets[i].type == 1){
				icon.style.background = 'url("/efind-0.0.1/img/USB.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 2){
				icon.style.background = 'url("/efind-0.0.1/img/Car.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 3){
				icon.style.background = 'url("/efind-0.0.1/img/Grounded outlet.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 4){
				icon.style.background = 'url("/efind-0.0.1/img/Ungrounded outlet.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 5){
				icon.style.background = 'url("/efind-0.0.1/img/Wireless.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			component.appendChild(icon);
			var typeText = document.createElement('div');
			typeText.className = "typeText";
			if(arrayOfOutlets[i].type == 1)
				typeText.innerHTML += "USB";
			else if(arrayOfOutlets[i].type == 2)
				typeText.innerHTML += "Car";
			else if(arrayOfOutlets[i].type == 3)
				typeText.innerHTML += "Grounded";
			else if(arrayOfOutlets[i].type == 4)
				typeText.innerHTML += "Ungrounded";
			else if(arrayOfOutlets[i].type == 5)
				typeText.innerHTML += "Wireless";
			component.appendChild(typeText);
			var latText = document.createElement('div');
			latText.className = "latText";
			latText.innerHTML += arrayOfOutlets[i].lat;
			component.appendChild(latText);
			var lngText = document.createElement('div');
			lngText.className = "lngText";
			lngText.innerHTML += arrayOfOutlets[i].lng;
			component.appendChild(lngText);
			var addressText = document.createElement('div');
			addressText.className = "addressText";
			addressText.innerHTML += arrayOfOutlets[i].name;
			component.appendChild(addressText);
			var actionButton = document.createElement('div');
			actionButton.className = "actionsButton";
			actionButton.onclick = function() {
				var coverSheet = document.getElementById("coverSheet");
				var addDialog = document.getElementById("addDialog");
				coverSheet.style.zIndex = 100;
				addDialog.style.zIndex = 150;
				var exitButton = document.getElementById("addExitButton");
				exitButton.onclick = function(){
					coverSheet.style.zIndex = -80;
					addDialog.style.zIndex = -80;
				};
				var nameInput = document.getElementById("addName");
				nameInput.value = arrayOfOutlets[i].name;
				var typeInput = document.getElementById("addTypeSelect");
				typeInput.value = arrayOfOutlets[i].type;
				var descriptionInput = document.getElementById("addDescription");
				descriptionInput.value = arrayOfOutlets[i].description;
				var totalInput = document.getElementById("addTotal");
				totalInput.value = arrayOfOutlets[i].totalOutlets;
				var isFreeInput = document.getElementById("addIsFree");
				isFreeInput.value = arrayOfOutlets[i].isFree;
				var closeTimeInput = document.getElementById("addCloseTime");
				closeTimeInput.value = arrayOfOutlets[i].closeTime;
				var saveButton = document.getElementById("addSaveButton");
				saveButton.onclick = function(){
					var name = nameInput.value;
					var type = typeInput.value;
					var description = descriptionInput.value;
					var total = totalInput.value;
					var isFree = isFreeInput.value;
					var closeTime = closeTimeInput.value;
					var id = arrayOfOutlets[i].id;
					var xhttp = new XMLHttpRequest();
					xhttp.open("GET","http://localhost:8080/efind-0.0.1/update?nume='"+name+"'&tip="+type+"&descriere='"+description+"'&id="+id+"&totale="+total+"&ora='"+closeTime+"'&free="+isFree , true);
					xhttp.send();
					coverSheet.style.zIndex = -80;
					addDialog.style.zIndex = -80;
					location.reload();
				};
			};
			component.appendChild(actionButton);
			list.appendChild(component);
			createAllOutletsList(i+1,0);
			}
			else
				createAllOutletsList(i+1,0);
		}
		else if(ok==0){
			if(arrayOfOutlets[i].status == 1){
			var component = document.createElement("div");
			component.className = "componentTypeI";
			var checkBox = document.createElement("input");
			checkBox.setAttribute("type", "checkbox");
			checkBox.className = "checkOne";
			component.appendChild(checkBox);
			var icon = document.createElement('div');
			icon.className = "iconUngr";
			if(arrayOfOutlets[i].type == 1){
				icon.style.background = 'url("/efind-0.0.1/img/USB.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 2){
				icon.style.background = 'url("/efind-0.0.1/img/Car.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 3){
				icon.style.background = 'url("/efind-0.0.1/img/Grounded outlet.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 4){
				icon.style.background = 'url("/efind-0.0.1/img/Ungrounded outlet.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 5){
				icon.style.background = 'url("/efind-0.0.1/img/Wireless.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			component.appendChild(icon);
			var typeText = document.createElement('div');
			typeText.className = "typeText";
			if(arrayOfOutlets[i].type == 1)
				typeText.innerHTML += "USB";
			else if(arrayOfOutlets[i].type == 2)
				typeText.innerHTML += "Car";
			else if(arrayOfOutlets[i].type == 3)
				typeText.innerHTML += "Grounded";
			else if(arrayOfOutlets[i].type == 4)
				typeText.innerHTML += "Ungrounded";
			else if(arrayOfOutlets[i].type == 5)
				typeText.innerHTML += "Wireless";
			component.appendChild(typeText);
			var latText = document.createElement('div');
			latText.className = "latText";
			latText.innerHTML += arrayOfOutlets[i].lat;
			component.appendChild(latText);
			var lngText = document.createElement('div');
			lngText.className = "lngText";
			lngText.innerHTML += arrayOfOutlets[i].lng;
			component.appendChild(lngText);
			var addressText = document.createElement('div');
			addressText.className = "addressText";
			addressText.innerHTML += arrayOfOutlets[i].name;
			component.appendChild(addressText);
			var actionButton = document.createElement('div');
			actionButton.className = "actionsButton";
			actionButton.onclick = function() {
				var coverSheet = document.getElementById("coverSheet");
				var addDialog = document.getElementById("addDialog");
				coverSheet.style.zIndex = 100;
				addDialog.style.zIndex = 150;
				var exitButton = document.getElementById("addExitButton");
				exitButton.onclick = function(){
					coverSheet.style.zIndex = -80;
					addDialog.style.zIndex = -80;
				};
				var nameInput = document.getElementById("addName");
				nameInput.value = arrayOfOutlets[i].name;
				var typeInput = document.getElementById("addTypeSelect");
				typeInput.value = arrayOfOutlets[i].type;
				var descriptionInput = document.getElementById("addDescription");
				descriptionInput.value = arrayOfOutlets[i].description;
				var totalInput = document.getElementById("addTotal");
				totalInput.value = arrayOfOutlets[i].totalOutlets;
				var isFreeInput = document.getElementById("addIsFree");
				isFreeInput.value = arrayOfOutlets[i].isFree;
				var closeTimeInput = document.getElementById("addCloseTime");
				closeTimeInput.value = arrayOfOutlets[i].closeTime;
				var saveButton = document.getElementById("addSaveButton");
				saveButton.onclick = function(){
					var name = nameInput.value;
					var type = typeInput.value;
					var description = descriptionInput.value;
					var total = totalInput.value;
					var isFree = isFreeInput.value;
					var closeTime = closeTimeInput.value;
					var id = arrayOfOutlets[i].id;
					var xhttp = new XMLHttpRequest();
					xhttp.open("GET","http://localhost:8080/efind-0.0.1/update?nume='"+name+"'&tip="+type+"&descriere='"+description+"'&id="+id+"&totale="+total+"&ora='"+closeTime+"'&free="+isFree , true);
					xhttp.send();
					coverSheet.style.zIndex = -80;
					addDialog.style.zIndex = -80;
					location.reload();
				};
			};
			component.appendChild(actionButton);
			list.appendChild(component);
			createAllOutletsList(i+1,1);
			}
			else
				createAllOutletsList(i+1,1);
		}
	}
}


function createPendingOutletsList(i, ok){
	if(i<=arrayOfOutlets.length-1){
		if(ok==1){
			if(arrayOfOutlets[i].status == 2){
			var component = document.createElement("div");
			component.className = "componentTypeII";
			var checkBox = document.createElement("input");
			checkBox.setAttribute("type", "checkbox");
			checkBox.className = "checkOne";
			component.appendChild(checkBox);
			var icon = document.createElement('div');
			icon.className = "iconUngr";
			if(arrayOfOutlets[i].type == 1){
				icon.style.background = 'url("/efind-0.0.1/img/USB.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 2){
				icon.style.background = 'url("/efind-0.0.1/img/Car.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 3){
				icon.style.background = 'url("/efind-0.0.1/img/Grounded outlet.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 4){
				icon.style.background = 'url("/efind-0.0.1/img/Ungrounded outlet.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 5){
				icon.style.background = 'url("/efind-0.0.1/img/Wireless.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			component.appendChild(icon);
			var typeText = document.createElement('div');
			typeText.className = "typeText";
			if(arrayOfOutlets[i].type == 1)
				typeText.innerHTML += "USB";
			else if(arrayOfOutlets[i].type == 2)
				typeText.innerHTML += "Car";
			else if(arrayOfOutlets[i].type == 3)
				typeText.innerHTML += "Grounded";
			else if(arrayOfOutlets[i].type == 4)
				typeText.innerHTML += "Ungrounded";
			else if(arrayOfOutlets[i].type == 5)
				typeText.innerHTML += "Wireless";
			component.appendChild(typeText);
			var latText = document.createElement('div');
			latText.className = "latText";
			latText.innerHTML += arrayOfOutlets[i].lat;
			component.appendChild(latText);
			var lngText = document.createElement('div');
			lngText.className = "lngText";
			lngText.innerHTML += arrayOfOutlets[i].lng;
			component.appendChild(lngText);
			var addressText = document.createElement('div');
			addressText.className = "addressText";
			addressText.innerHTML += arrayOfOutlets[i].name;
			component.appendChild(addressText);
			var actionButton = document.createElement('div');
			actionButton.className = "actionsButton";
			actionButton.onclick = function(){
				var coverSheet = document.getElementById("coverSheet");
				coverSheet.style.zIndex = 150;
				var actionBox = document.getElementById("actionBox");
				actionBox.style.zIndex = 200;
				var actionExitButton = document.getElementById("actionExitButton");
				actionExitButton.onclick = function(){
					coverSheet.style.zIndex = -80;
					actionBox.style.zIndex = -80;
				};
				var actionTitle = document.getElementById("actionTitle");
				actionTitle.innerHTML = "";
				actionTitle.innerHTML += "Add outlet?";
				var actionNoButton = document.getElementById("actionNoButton");
				actionNoButton.onclick = function(){
					coverSheet.style.zIndex = -80;
					actionBox.style.zIndex = -80;
				};
				var actionYesButton = document.getElementById("actionYesButton");
				actionYesButton.onclick = function(){
					var xhttp = new XMLHttpRequest();
					xhttp.open("GET", "http://localhost:8080/efind-0.0.1/changeStatus?id="+arrayOfOutlets[i].id+"&status="+1,true);
					xhttp.send();
					coverSheet.style.zIndex = -80;
					actionBox.style.zIndex = -80;
					location.reload();
				};					
			};
			component.appendChild(actionButton);
			list.appendChild(component);
			createPendingOutletsList(i+1,0);
			}
			else
				createPendingOutletsList(i+1,0);
		}
		else if(ok==0){
			if(arrayOfOutlets[i].status == 2){
			var component = document.createElement("div");
			component.className = "componentTypeI";
			var checkBox = document.createElement("input");
			checkBox.setAttribute("type", "checkbox");
			checkBox.className = "checkOne";
			component.appendChild(checkBox);
			var icon = document.createElement('div');
			icon.className = "iconUngr";
			if(arrayOfOutlets[i].type == 1){
				icon.style.background = 'url("/efind-0.0.1/img/USB.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 2){
				icon.style.background = 'url("/efind-0.0.1/img/Car.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 3){
				icon.style.background = 'url("/efind-0.0.1/img/Grounded outlet.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 4){
				icon.style.background = 'url("/efind-0.0.1/img/Ungrounded outlet.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 5){
				icon.style.background = 'url("/efind-0.0.1/img/Wireless.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			component.appendChild(icon);
			var typeText = document.createElement('div');
			typeText.className = "typeText";
			if(arrayOfOutlets[i].type == 1)
				typeText.innerHTML += "USB";
			else if(arrayOfOutlets[i].type == 2)
				typeText.innerHTML += "Car";
			else if(arrayOfOutlets[i].type == 3)
				typeText.innerHTML += "Grounded";
			else if(arrayOfOutlets[i].type == 4)
				typeText.innerHTML += "Ungrounded";
			else if(arrayOfOutlets[i].type == 5)
				typeText.innerHTML += "Wireless";
			component.appendChild(typeText);
			var latText = document.createElement('div');
			latText.className = "latText";
			latText.innerHTML += arrayOfOutlets[i].lat;
			component.appendChild(latText);
			var lngText = document.createElement('div');
			lngText.className = "lngText";
			lngText.innerHTML += arrayOfOutlets[i].lng;
			component.appendChild(lngText);
			var addressText = document.createElement('div');
			addressText.className = "addressText";
			addressText.innerHTML += arrayOfOutlets[i].name;
			component.appendChild(addressText);
			var actionButton = document.createElement('div');
			actionButton.className = "actionsButton";
			actionButton.onclick = function(){
				var coverSheet = document.getElementById("coverSheet");
				coverSheet.style.zIndex = 150;
				var actionBox = document.getElementById("actionBox");
				actionBox.style.zIndex = 200;
				var actionExitButton = document.getElementById("actionExitButton");
				actionExitButton.onclick = function(){
					coverSheet.style.zIndex = -80;
					actionBox.style.zIndex = -80;
				};
				var actionTitle = document.getElementById("actionTitle");
				actionTitle.innerHTML = "";
				actionTitle.innerHTML += "Add outlet?";
				var actionNoButton = document.getElementById("actionNoButton");
				actionNoButton.onclick = function(){
					coverSheet.style.zIndex = -80;
					actionBox.style.zIndex = -80;
				};
				var actionYesButton = document.getElementById("actionYesButton");
				actionYesButton.onclick = function(){
					var xhttp = new XMLHttpRequest();
					xhttp.open("GET", "http://localhost:8080/efind-0.0.1/changeStatus?id="+arrayOfOutlets[i].id+"&status="+1,true);
					xhttp.send();
					coverSheet.style.zIndex = -80;
					actionBox.style.zIndex = -80;
					location.reload();
				};					
			};
			component.appendChild(actionButton);
			list.appendChild(component);
			createPendingOutletsList(i+1,1);
			}
			else
				createPendingOutletsList(i+1,1);
		}
	}
}

function createBadOutletsList(i, ok){
	if(i<=arrayOfOutlets.length-1){
		if(ok==1){
			if(arrayOfOutlets[i].reports != 0 && arrayOfOutlets[i].status != 0){
			var component = document.createElement("div");
			component.className = "componentTypeII";
			var checkBox = document.createElement("input");
			checkBox.setAttribute("type", "checkbox");
			checkBox.className = "checkOne";
			component.appendChild(checkBox);
			var icon = document.createElement('div');
			icon.className = "iconUngr";
			if(arrayOfOutlets[i].type == 1){
				icon.style.background = 'url("/efind-0.0.1/img/USB.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 2){
				icon.style.background = 'url("/efind-0.0.1/img/Car.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 3){
				icon.style.background = 'url("/efind-0.0.1/img/Grounded outlet.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 4){
				icon.style.background = 'url("/efind-0.0.1/img/Ungrounded outlet.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 5){
				icon.style.background = 'url("/efind-0.0.1/img/Wireless.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			component.appendChild(icon);
			var typeText = document.createElement('div');
			typeText.className = "typeText";
			if(arrayOfOutlets[i].type == 1)
				typeText.innerHTML += "USB";
			else if(arrayOfOutlets[i].type == 2)
				typeText.innerHTML += "Car";
			else if(arrayOfOutlets[i].type == 3)
				typeText.innerHTML += "Grounded";
			else if(arrayOfOutlets[i].type == 4)
				typeText.innerHTML += "Ungrounded";
			else if(arrayOfOutlets[i].type == 5)
				typeText.innerHTML += "Wireless";
			component.appendChild(typeText);
			var latText = document.createElement('div');
			latText.className = "latText";
			latText.innerHTML += arrayOfOutlets[i].lat;
			component.appendChild(latText);
			var lngText = document.createElement('div');
			lngText.className = "lngText";
			lngText.innerHTML += arrayOfOutlets[i].lng;
			component.appendChild(lngText);
			var addressText = document.createElement('div');
			addressText.className = "addressText";
			addressText.innerHTML += arrayOfOutlets[i].name;
			component.appendChild(addressText);
			var actionButton = document.createElement('div');
			actionButton.className = "actionsButton";
			actionButton.onclick = function(){
				var coverSheet = document.getElementById("coverSheet");
				coverSheet.style.zIndex = 150;
				var actionBox = document.getElementById("actionBox");
				actionBox.style.zIndex = 200;
				var actionExitButton = document.getElementById("actionExitButton");
				actionExitButton.onclick = function(){
					coverSheet.style.zIndex = -80;
					actionBox.style.zIndex = -80;
				};
				var actionTitle = document.getElementById("actionTitle");
				actionTitle.innerHTML = "";
				actionTitle.innerHTML += "Deactivate outlet?";
				var actionNoButton = document.getElementById("actionNoButton");
				actionNoButton.onclick = function(){
					coverSheet.style.zIndex = -80;
					actionBox.style.zIndex = -80;
				};
				var actionYesButton = document.getElementById("actionYesButton");
				actionYesButton.onclick = function(){
					var xhttp = new XMLHttpRequest();
					xhttp.open("GET", "http://localhost:8080/efind-0.0.1/changeStatus?id="+arrayOfOutlets[i].id+"&status="+0,true);
					xhttp.send();
					coverSheet.style.zIndex = -80;
					actionBox.style.zIndex = -80;
					location.reload();
				};					
			};
			component.appendChild(actionButton);
			list.appendChild(component);
			createBadOutletsList(i+1,0);
			}
			else
				createBadOutletsList(i+1,0);
		}
		else if(ok==0){
			if(arrayOfOutlets[i].reports != 0 && arrayOfOutlets[i].status != 0){
			var component = document.createElement("div");
			component.className = "componentTypeI";
			var checkBox = document.createElement("input");
			checkBox.setAttribute("type", "checkbox");
			checkBox.className = "checkOne";
			component.appendChild(checkBox);
			var icon = document.createElement('div');
			icon.className = "iconUngr";
			if(arrayOfOutlets[i].type == 1){
				icon.style.background = 'url("/efind-0.0.1/img/USB.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 2){
				icon.style.background = 'url("/efind-0.0.1/img/Car.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 3){
				icon.style.background = 'url("/efind-0.0.1/img/Grounded outlet.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 4){
				icon.style.background = 'url("/efind-0.0.1/img/Ungrounded outlet.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 5){
				icon.style.background = 'url("/efind-0.0.1/img/Wireless.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			component.appendChild(icon);
			var typeText = document.createElement('div');
			typeText.className = "typeText";
			if(arrayOfOutlets[i].type == 1)
				typeText.innerHTML += "USB";
			else if(arrayOfOutlets[i].type == 2)
				typeText.innerHTML += "Car";
			else if(arrayOfOutlets[i].type == 3)
				typeText.innerHTML += "Grounded";
			else if(arrayOfOutlets[i].type == 4)
				typeText.innerHTML += "Ungrounded";
			else if(arrayOfOutlets[i].type == 5)
				typeText.innerHTML += "Wireless";
			component.appendChild(typeText);
			var latText = document.createElement('div');
			latText.className = "latText";
			latText.innerHTML += arrayOfOutlets[i].lat;
			component.appendChild(latText);
			var lngText = document.createElement('div');
			lngText.className = "lngText";
			lngText.innerHTML += arrayOfOutlets[i].lng;
			component.appendChild(lngText);
			var addressText = document.createElement('div');
			addressText.className = "addressText";
			addressText.innerHTML += arrayOfOutlets[i].name;
			component.appendChild(addressText);
			var actionButton = document.createElement('div');
			actionButton.className = "actionsButton";
			actionButton.onclick = function(){
				var coverSheet = document.getElementById("coverSheet");
				coverSheet.style.zIndex = 150;
				var actionBox = document.getElementById("actionBox");
				actionBox.style.zIndex = 200;
				var actionExitButton = document.getElementById("actionExitButton");
				actionExitButton.onclick = function(){
					coverSheet.style.zIndex = -80;
					actionBox.style.zIndex = -80;
				};
				var actionTitle = document.getElementById("actionTitle");
				actionTitle.innerHTML = "";
				actionTitle.innerHTML += "Deactivate outlet?";
				var actionNoButton = document.getElementById("actionNoButton");
				actionNoButton.onclick = function(){
					coverSheet.style.zIndex = -80;
					actionBox.style.zIndex = -80;
				};
				var actionYesButton = document.getElementById("actionYesButton");
				actionYesButton.onclick = function(){
					var xhttp = new XMLHttpRequest();
					xhttp.open("GET", "http://localhost:8080/efind-0.0.1/changeStatus?id="+arrayOfOutlets[i].id+"&status="+0,true);
					xhttp.send();
					coverSheet.style.zIndex = -80;
					actionBox.style.zIndex = -80;
					location.reload();
				};					
			};
			component.appendChild(actionButton);
			list.appendChild(component);
			createBadOutletsList(i+1,1);
			}
			else
				createBadOutletsList(i+1,1);
		}
	}
}

function createInactiveOutletsList(i, ok){
	if(i<=arrayOfOutlets.length-1){
		if(ok==1){
			if(arrayOfOutlets[i].status == 0){
			var component = document.createElement("div");
			component.className = "componentTypeII";
			var checkBox = document.createElement("input");
			checkBox.setAttribute("type", "checkbox");
			checkBox.className = "checkOne";
			component.appendChild(checkBox);
			var icon = document.createElement('div');
			icon.className = "iconUngr";
			if(arrayOfOutlets[i].type == 1){
				icon.style.background = 'url("/efind-0.0.1/img/USB.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 2){
				icon.style.background = 'url("/efind-0.0.1/img/Car.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 3){
				icon.style.background = 'url("/efind-0.0.1/img/Grounded outlet.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 4){
				icon.style.background = 'url("/efind-0.0.1/img/Ungrounded outlet.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 5){
				icon.style.background = 'url("/efind-0.0.1/img/Wireless.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			component.appendChild(icon);
			var typeText = document.createElement('div');
			typeText.className = "typeText";
			if(arrayOfOutlets[i].type == 1)
				typeText.innerHTML += "USB";
			else if(arrayOfOutlets[i].type == 2)
				typeText.innerHTML += "Car";
			else if(arrayOfOutlets[i].type == 3)
				typeText.innerHTML += "Grounded";
			else if(arrayOfOutlets[i].type == 4)
				typeText.innerHTML += "Ungrounded";
			else if(arrayOfOutlets[i].type == 5)
				typeText.innerHTML += "Wireless";
			component.appendChild(typeText);
			var latText = document.createElement('div');
			latText.className = "latText";
			latText.innerHTML += arrayOfOutlets[i].lat;
			component.appendChild(latText);
			var lngText = document.createElement('div');
			lngText.className = "lngText";
			lngText.innerHTML += arrayOfOutlets[i].lng;
			component.appendChild(lngText);
			var addressText = document.createElement('div');
			addressText.className = "addressText";
			addressText.innerHTML += arrayOfOutlets[i].name;
			component.appendChild(addressText);
			var actionButton = document.createElement('div');
			actionButton.className = "actionsButton";
			component.appendChild(actionButton);
			list.appendChild(component);
			createInactiveOutletsList(i+1,0);
			}
			else
				createInactiveOutletsList(i+1,0);
		}
		else if(ok==0){
			if(arrayOfOutlets[i].status == 0){
			var component = document.createElement("div");
			component.className = "componentTypeI";
			var checkBox = document.createElement("input");
			checkBox.setAttribute("type", "checkbox");
			checkBox.className = "checkOne";
			component.appendChild(checkBox);
			var icon = document.createElement('div');
			icon.className = "iconUngr";
			if(arrayOfOutlets[i].type == 1){
				icon.style.background = 'url("/efind-0.0.1/img/USB.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 2){
				icon.style.background = 'url("/efind-0.0.1/img/Car.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 3){
				icon.style.background = 'url("/efind-0.0.1/img/Grounded outlet.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 4){
				icon.style.background = 'url("/efind-0.0.1/img/Ungrounded outlet.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			else if(arrayOfOutlets[i].type == 5){
				icon.style.background = 'url("/efind-0.0.1/img/Wireless.png") no-repeat';
			icon.style.backgroundSize = "70%";}
			component.appendChild(icon);
			var typeText = document.createElement('div');
			typeText.className = "typeText";
			if(arrayOfOutlets[i].type == 1)
				typeText.innerHTML += "USB";
			else if(arrayOfOutlets[i].type == 2)
				typeText.innerHTML += "Car";
			else if(arrayOfOutlets[i].type == 3)
				typeText.innerHTML += "Grounded";
			else if(arrayOfOutlets[i].type == 4)
				typeText.innerHTML += "Ungrounded";
			else if(arrayOfOutlets[i].type == 5)
				typeText.innerHTML += "Wireless";
			component.appendChild(typeText);
			var latText = document.createElement('div');
			latText.className = "latText";
			latText.innerHTML += arrayOfOutlets[i].lat;
			component.appendChild(latText);
			var lngText = document.createElement('div');
			lngText.className = "lngText";
			lngText.innerHTML += arrayOfOutlets[i].lng;
			component.appendChild(lngText);
			var addressText = document.createElement('div');
			addressText.className = "addressText";
			addressText.innerHTML += arrayOfOutlets[i].name;
			component.appendChild(addressText);
			var actionButton = document.createElement('div');
			actionButton.className = "actionsButton";
			component.appendChild(actionButton);
			list.appendChild(component);
			createInactiveOutletsList(i+1,1);
			}
			else
				createInactiveOutletsList(i+1,1);
		}
	}
}


pendingOutletsButton.onclick = function(){
	try{
	var pendingUnselectedText = document.getElementById("pendingUnselectedText");
	pendingUnselectedText.parentNode.removeChild(pendingUnselectedText);
	var pendingSelectedText = document.createElement("div");
	pendingSelectedText.className = "selectedButtonText";
	pendingSelectedText.id = "pendingSelectedText";
	pendingSelectedText.innerHTML += "Pending outlets";
	pendingOutletsButton.appendChild(pendingSelectedText);
	var pendingIdentifier = document.createElement("div");
	pendingIdentifier.className = "identifier";
	pendingIdentifier.id = "pendingIdentifier";
	pendingOutletsButton.appendChild(pendingIdentifier);
	pendingOutletsButton.style.backgroundColor = "#2a80a0";
	
	while(allOutletsButton.firstChild){
		allOutletsButton.removeChild(allOutletsButton.firstChild);
	}
	var allUnselectedText = document.createElement("div");
	allUnselectedText.className = "unselectedButtonText";
	allUnselectedText.id = "allUnselectedText";
	allUnselectedText.innerHTML += "All outlets";
	allOutletsButton.appendChild(allUnselectedText);
	allOutletsButton.style.backgroundColor = "transparent";
	
	while(badOutletsButton.firstChild){
		badOutletsButton.removeChild(badOutletsButton.firstChild);
	}
	var badUnselectedText = document.createElement("div");
	badUnselectedText.className = "unselectedButtonText";
	badUnselectedText.id = "badUnselectedText";
	badUnselectedText.innerHTML += "Bad outlets";
	badOutletsButton.appendChild(badUnselectedText);
	badOutletsButton.style.backgroundColor = "transparent";
	
	while(inactiveOutletsButton.firstChild){
		inactiveOutletsButton.removeChild(inactiveOutletsButton.firstChild);
	}
	var inactiveUnselectedText = document.createElement("div");
	inactiveUnselectedText.className = "unselectedButtonText";
	inactiveUnselectedText.id = "inactiveUnselectedText";
	inactiveUnselectedText.innerHTML += "Inactive outlets";
	inactiveOutletsButton.appendChild(inactiveUnselectedText);
	inactiveOutletsButton.style.backgroundColor = "transparent";
	
	while(list.firstChild){
		list.removeChild(list.firstChild);
	}
	createPendingOutletsList(0,0);
	var title = document.getElementById("title");
	title.innerHTML = "";
	title.innerHTML += "Pending outlets";
	}
	catch(err){
		console.log(err);
	}
};


allOutletsButton.onclick = function(){
	try{
	var allUnselectedText = document.getElementById("allUnselectedText");
	allUnselectedText.parentNode.removeChild(allUnselectedText);
	var allSelectedText = document.createElement("div");
	allSelectedText.className = "selectedButtonText";
	allSelectedText.id = "allSelectedText";
	allSelectedText.innerHTML += "All outlets";
	allOutletsButton.appendChild(allSelectedText);
	var allIdentifier = document.createElement("div");
	allIdentifier.className = "identifier";
	allIdentifier.id = "allIdentifier";
	allOutletsButton.appendChild(allIdentifier);
	allOutletsButton.style.backgroundColor = "#2a80a0";
	
	while(pendingOutletsButton.firstChild){
		pendingOutletsButton.removeChild(pendingOutletsButton.firstChild);
	}
	var pendingUnselectedText = document.createElement("div");
	pendingUnselectedText.className = "unselectedButtonText";
	pendingUnselectedText.id = "pendingUnselectedText";
	pendingUnselectedText.innerHTML += "Pending outlets";
	pendingOutletsButton.appendChild(pendingUnselectedText);
	pendingOutletsButton.style.backgroundColor = "transparent";
	
	while(badOutletsButton.firstChild){
		badOutletsButton.removeChild(badOutletsButton.firstChild);
	}
	var badUnselectedText = document.createElement("div");
	badUnselectedText.className = "unselectedButtonText";
	badUnselectedText.id = "badUnselectedText";
	badUnselectedText.innerHTML += "Bad outlets";
	badOutletsButton.appendChild(badUnselectedText);
	badOutletsButton.style.backgroundColor = "transparent";
	
	while(inactiveOutletsButton.firstChild){
		inactiveOutletsButton.removeChild(inactiveOutletsButton.firstChild);
	}
	var inactiveUnselectedText = document.createElement("div");
	inactiveUnselectedText.className = "unselectedButtonText";
	inactiveUnselectedText.id = "inactiveUnselectedText";
	inactiveUnselectedText.innerHTML += "Inactive outlets";
	inactiveOutletsButton.appendChild(inactiveUnselectedText);
	inactiveOutletsButton.style.backgroundColor = "transparent";
	
	while(list.firstChild){
		list.removeChild(list.firstChild);
	}
	createAllOutletsList(0,0);
	var title = document.getElementById("title");
	title.innerHTML = "";
	title.innerHTML += "All outlets";
	}
	catch(err){
		console.log(err);
	}
};

badOutletsButton.onclick = function(){
	try{
	var badUnselectedText = document.getElementById("badUnselectedText");
	badUnselectedText.parentNode.removeChild(badUnselectedText);
	var badSelectedText = document.createElement("div");
	badSelectedText.className = "selectedButtonText";
	badSelectedText.id = "badSelectedText";
	badSelectedText.innerHTML += "Bad outlets";
	badOutletsButton.appendChild(badSelectedText);
	var badIdentifier = document.createElement("div");
	badIdentifier.className = "identifier";
	badIdentifier.id = "badIdentifier";
	badOutletsButton.appendChild(badIdentifier);
	badOutletsButton.style.backgroundColor = "#2a80a0";
	
	while(pendingOutletsButton.firstChild){
		pendingOutletsButton.removeChild(pendingOutletsButton.firstChild);
	}
	var pendingUnselectedText = document.createElement("div");
	pendingUnselectedText.className = "unselectedButtonText";
	pendingUnselectedText.id = "pendingUnselectedText";
	pendingUnselectedText.innerHTML += "Pending outlets";
	pendingOutletsButton.appendChild(pendingUnselectedText);
	pendingOutletsButton.style.backgroundColor = "transparent";
	
	while(allOutletsButton.firstChild){
		allOutletsButton.removeChild(allOutletsButton.firstChild);
	}
	var allUnselectedText = document.createElement("div");
	allUnselectedText.className = "unselectedButtonText";
	allUnselectedText.id = "allUnselectedText";
	allUnselectedText.innerHTML += "All outlets";
	allOutletsButton.appendChild(allUnselectedText);
	allOutletsButton.style.backgroundColor = "transparent";
	
	while(inactiveOutletsButton.firstChild){
		inactiveOutletsButton.removeChild(inactiveOutletsButton.firstChild);
	}
	var inactiveUnselectedText = document.createElement("div");
	inactiveUnselectedText.className = "unselectedButtonText";
	inactiveUnselectedText.id = "inactiveUnselectedText";
	inactiveUnselectedText.innerHTML += "Inactive outlets";
	inactiveOutletsButton.appendChild(inactiveUnselectedText);
	inactiveOutletsButton.style.backgroundColor = "transparent";
	
	while(list.firstChild){
		list.removeChild(list.firstChild);
	}
	createBadOutletsList(0,0);
	var title = document.getElementById("title");
	title.innerHTML = "";
	title.innerHTML += "Bad outlets";
	}
	catch(err){
		console.log(err);
	}
};


inactiveOutletsButton.onclick = function(){
	try{
	var inactiveUnselectedText = document.getElementById("inactiveUnselectedText");
	inactiveUnselectedText.parentNode.removeChild(inactiveUnselectedText);
	var inactiveSelectedText = document.createElement("div");
	inactiveSelectedText.className = "selectedButtonText";
	inactiveSelectedText.id = "inactiveSelectedText";
	inactiveSelectedText.innerHTML += "Inactive outlets";
	inactiveOutletsButton.appendChild(inactiveSelectedText);
	var inactiveIdentifier = document.createElement("div");
	inactiveIdentifier.className = "identifier";
	inactiveIdentifier.id = "inactiveIdentifier";
	inactiveOutletsButton.appendChild(inactiveIdentifier);
	inactiveOutletsButton.style.backgroundColor = "#2a80a0";
	
	while(pendingOutletsButton.firstChild){
		pendingOutletsButton.removeChild(pendingOutletsButton.firstChild);
	}
	var pendingUnselectedText = document.createElement("div");
	pendingUnselectedText.className = "unselectedButtonText";
	pendingUnselectedText.id = "pendingUnselectedText";
	pendingUnselectedText.innerHTML += "Pending outlets";
	pendingOutletsButton.appendChild(pendingUnselectedText);
	pendingOutletsButton.style.backgroundColor = "transparent";
	
	while(allOutletsButton.firstChild){
		allOutletsButton.removeChild(allOutletsButton.firstChild);
	}
	var allUnselectedText = document.createElement("div");
	allUnselectedText.className = "unselectedButtonText";
	allUnselectedText.id = "allUnselectedText";
	allUnselectedText.innerHTML += "All outlets";
	allOutletsButton.appendChild(allUnselectedText);
	allOutletsButton.style.backgroundColor = "transparent";
	
	while(badOutletsButton.firstChild){
		badOutletsButton.removeChild(badOutletsButton.firstChild);
	}
	var badUnselectedText = document.createElement("div");
	badUnselectedText.className = "unselectedButtonText";
	badUnselectedText.id = "badUnselectedText";
	badUnselectedText.innerHTML += "Bad outlets";
	badOutletsButton.appendChild(badUnselectedText);
	badOutletsButton.style.backgroundColor = "transparent";
	
	while(list.firstChild){
		list.removeChild(list.firstChild);
	}
	createInactiveOutletsList(0,0);
	var title = document.getElementById("title");
	title.innerHTML = "";
	title.innerHTML += "Inactive outlets";
	}
	catch(err){
		console.log(err);
	}
};