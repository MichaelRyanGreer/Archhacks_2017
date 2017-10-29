
var pages = document.getElementsByClassName("page");
var lockers = [];
var userNames = [];
var userAll = [];
var userNumbers = [];
lockers.push(null);
lockers.push(null);
barName = "Puzzles"
barCode = "0001";
var currentUser = null;


function showPage(id) {
	//document.getElementsByClassName("inputForm").value = "";
	console.log(id + " is the page loading");
	if (id == "login") {
		currentUser = null;
	}
	for(let page of pages) {
		if(page.id == id) {
			page.style.display = "inline";
		} else {
			page.style.display = "none";
		}
	}
}

document.getElementById("loginPageBTN").addEventListener("click", function () {
	if (document.getElementById("userBarCode").value === barCode || document.getElementById("userBarName").value === barName){
		showPage("login");
		document.getElementById("currentBarName").innerHTML = barName;
	}
	else{
		showPage("barDNE");
	}
	document.getElementById("userBarCode").value = "";
	document.getElementById("userBarName").value = "";
}
)

document.getElementById("loginBTN").addEventListener("click", function () {
	currentUser = document.getElementById("username").value + document.getElementById("userPin").value + document.getElementById("userNumber").value
	currentName = document.getElementById("username").value
	currentNumber = document.getElementById("userNumber").value
	var exists = false
	for (i = 0; i < userNames.length; i++){
		if(userNames[i] === currentName && userNumbers[i] === currentNumber){
			exists = true;
			if(userAll[i] === currentUser){
				showPage("homePage");
				document.getElementById("username").value = "";
				document.getElementById("userPin").value = "";
				document.getElementById("userNumber").value = "";
				document.getElementById("userHomeName").innerHTML = currentName;
			}
			else{
				showPage("incorrectPass");
				document.getElementById("username").value = "";
				document.getElementById("userPin").value = "";
				document.getElementById("userNumber").value = "";
			}
		}
	}
	if (!exists){
		userNames.push(currentName);
		userNumbers.push(currentNumber);
		userAll.push(currentUser);
		showPage("homePage");
		document.getElementById("userHomeName").innerHTML = currentName + "<br><h3>Thanks for signing up!</h3>";
		document.getElementById("username").value = "";
		document.getElementById("userPin").value = "";
		document.getElementById("userNumber").value = "";
	}
	document.getElementById("username").value = "";
	document.getElementById("userPin").value = "";
	document.getElementById("userNumber").value = "";
}
)

document.getElementById("logout").addEventListener("click", function () {
	showPage("login");
}
)

document.getElementById("logout2").addEventListener("click", function () {
	showPage("login");
}
)

document.getElementById("requestConfirm").addEventListener("click", function () {
	showPage("requestConfirmPage");
}
)

document.getElementById("change1").addEventListener("click", function () {
	currentUser = null;
	showPage("landing");
}
)

document.getElementById("headHome").addEventListener("click", function () {
	showPage("landing");
}
)

document.getElementById("reqBTN2").addEventListener("click", function () {
	if (lockers[0] === null || lockers[1] === null){
		showPage("request");
		for (i = 0; i < lockers.length; i++){
			if (lockers[i] === null){
				document.getElementById("boxNumDisplay").innerHTML = i + 1;
				document.getElementById("reqName").innerHTML = currentName;
				lockers[i] = currentUser;
				break;
			}
		}
	}
	else{
		showPage("noSpace");
	}
}
)

document.getElementById("reqBTN").addEventListener("click", function () {
	if (lockers[0] === null || lockers[1] === null){
		showPage("request");
		for (i = 0; i < lockers.length; i++){
			if (lockers[i] === null){
				document.getElementById("boxNumDisplay").innerHTML = i + 1;
				document.getElementById("reqName").innerHTML = currentName;
				lockers[i] = currentUser;
				break;
			}
		}
	}
	else{
		showPage("noSpace");
	}
}
)

document.getElementById("retBTN").addEventListener("click", function () {
	hasLocker = false;
	//canRetrieve
	lockerNumber = null;
	for (i = 0; i < lockers.length; i++){
		if (lockers[i] === currentUser){
			hasLocker = true;
			lockerNumber = i;
		}
	}
	if(hasLocker)	{
		lockers[lockerNumber] = null;
		//See status from sensor
		//-1 --> drunk and no keys
		//0 --> not drunk, get keys

		getTheKeys = 0;
		if (getTheKeys === 0){
			document.getElementById("openingLocker").innerHTML = " " + (lockerNumber + 1);
			document.getElementById("canRetrieve").innerHTML = "Ready to open, have a safe night!"
			showPage("keyReturned");
		}
		else{
			document.getElementById("openingLocker").innerHTML = " " + (lockerNumber + 1);
			document.getElementById("canRetrieve").innerHTML = "Sorry, but you are above the legal limit."
			showPage("keyReturned");
		}
	}
else {
	showPage("noLocker");
}

}
)


document.getElementById("change2").addEventListener("click", function () {
	currentUser = null;
	showPage("landing");
}
)

document.getElementById("change3").addEventListener("click", function () {
	currentUser = null;
	showPage("landing");
}
)

document.getElementById("change4").addEventListener("click", function () {
	currentUser = null;
	showPage("landing");
}
)

document.getElementById("change5").addEventListener("click", function () {
	currentUser = null;
	showPage("landing");
}
)

document.getElementById("change6").addEventListener("click", function () {
	currentUser = null;
	showPage("landing");
}
)

document.getElementById("change7").addEventListener("click", function () {
	currentUser = null;
	showPage("login");
}
)

showPage("landing");
