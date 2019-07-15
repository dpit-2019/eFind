var allOutlet = document.getElementById("allOutletsButton");
var pendingOutlet = document.getElementById("pendingOutletsButton");
var badOutlet = document.getElementById("badOutletsButton");
var allOutletList = document.getElementById("alloutletlist");
var pendingOutletList = document.getElementById("pendingoutletlist");
var badOutletList = document.getElementById("badoutletlist");

allOutlet.addEventListener("click", bringAllToFront);

pendingOutlet.addEventListener("click", bringPendingToFront);

badOutlet.addEventListener("click", bringBadToFront);

function bringAllToFront() {
	badOutletList.style.display = 'none';
	allOutletList.style.display = 'block';
	pendingOutletList.style.display = 'none';
	allOutlet.style.backgroundColor = '#999999';
	pendingOutlet.style.backgroundColor = 'transparent';
	badOutlet.style.backgroundColor = 'transparent';
}

function bringPendingToFront() {
	badOutletList.style.display = 'none';
	pendingOutletList.style.display = 'block';
	allOutletList.style.display = 'none';
	allOutlet.style.backgroundColor = 'transparent';
	pendingOutlet.style.backgroundColor = '#999999';
	badOutlet.style.backgroundColor = 'transparent';
}

function bringBadToFront() {
	badOutletList.style.display = 'block';
	pendingOutletList.style.display = 'none';
	allOutletList.style.display = 'none';
	allOutlet.style.backgroundColor = 'transparent';
	pendingOutlet.style.backgroundColor = 'transparent';
	badOutlet.style.backgroundColor = '#999999';
}