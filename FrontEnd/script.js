
var pages = document.getElementsByClassName("page");
var lockers = [];
var userNames = [];
var userAll = [];
var userNumbers = [];
lockers.push(null);
lockers.push(null);
barName = "Puzzles" //Default bar we have
barCode = "0001";
var currentUser = null;
recentDoor = null;

var particle = new Particle(); //establish particle object
var token;

var login = 'michaelryangreer@gmail.com'; // Borrowing MIchaels particle, because I was using mine for a lab
var password = 'HelloWorld1'; // Will be changed after demo
var deviceId = '2d0029000847343232363230';  // Comes from the number in the particle.io Console

function loginSuccess(data) {
    console.log('API call completed on promise resolve: ', data.body.access_token);
    token = data.body.access_token;
}

function loginError(error) {
    console.log('API call completed on promise fail: ', error);
}

particle.login({username: login, password:password}).then(loginSuccess, loginError); // log into particle


//This function was built to navigate the page through showing all of the different pages
function showPage(id) {
	//console.log(id + " is the page loading"); // can be used for easier navigation
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

//This calls one of the PHP functions
document.getElementById("testEmail").addEventListner("click", function () {
  console.log("Start Notification");
  var res = "<?php php_func();?>";
  alert (res);
  return false;
}

// This calls the other PHP function
function on_callPhp_alert_tender() {
  console.log("Start Notification");
  var res = "<?php php_alert_tender();?>";
  alert (res);
  return false;
}

// Checks to see if bar exists, then logs into bar
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

// LOcker check out logic
document.getElementById("loginBTN").addEventListener("click", function () {
	currentUser = document.getElementById("username").value + document.getElementById("userPin").value + document.getElementById("userNumber").value
	currentName = document.getElementById("username").value
	currentNumber = document.getElementById("userNumber").value
	var exists = false
  // checks to see if there is an open locer
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
  //Gives the user a locker
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

//These functions all handle relocations from around the webpage
//Start
document.getElementById("logout").addEventListener("click", function () {
	showPage("login");
}
)

document.getElementById("logout2").addEventListener("click", function () {
	currentUser = null;
	showPage("landing");
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
	particle.callFunction({ deviceId: deviceId, name: 'closeDoor', argument: recentDoor.toString(), auth: token });
	showPage("landing");
}
)
//php_alert_tender

// Finds the correct locker that is in use
//Assigns proper Number//Then returns to open or close
document.getElementById("reqBTN").addEventListener("click", function () {
	console.log(lockers.toString() + " is the array before checking if there is a null element");
	if (lockers[0] === null || lockers[1] === null){
		showPage("request");
		for (i = 0; i < lockers.length; i++){
			if (lockers[i] === null){
				document.getElementById("boxNumDisplay").innerHTML = i + 1;
				document.getElementById("reqName").innerHTML = currentName;
				lockers[i] = currentUser;
				//FIXME open the door
				recentDoor = i;
				particle.callFunction({ deviceId: deviceId, name: 'openDoor', argument: i.toString(), auth: token });
				break;
			}
		}
	}
	else{
		showPage("noSpace");
	}
}
)

//gets the sensor data from the particle on the ethanol sensor
function getSensorData(lockerNumber){
	var getTheKeys = particle.callFunction({ deviceId: deviceId, name: 'runSensor', argument: lockerNumber.toString(), auth: token });
	showPage("keyReturned");
	document.getElementById("canRetrieve").innerHTML = "Sensing..."
	getTheKeys.then(
		function(data){
			var getTheKeys2 = data.body.return_value;
			console.log(getTheKeys2 + " calling data retrieved");
			dataRetrieve(getTheKeys2,lockerNumber);
			console.log("return function dataRetrieve");
			return;
		}, function (err)	{

		});
		return;
}

//This lets the user know if they failed or passed the breathalyzer
function dataRetrieve(getTheKeys,lockerNumber)	{
	console.log(getTheKeys + " Is what the function passed");
	if (getTheKeys === -1){
		document.getElementById("openingLockerTryAgain").innerHTML = " " + (lockerNumber + 1);
		document.getElementById("canRetrieveTryAgain").innerHTML = "Sensor did not detect breath. Please try again."
		showPage("keyReturnedTryAgain");
		console.log("return function getTheKeys with value -1");
		return;
	}
  //This is when they pass and can get kesy
	else if (getTheKeys === 0) {
		document.getElementById("openingLockerThenClose").innerHTML = " " + (lockerNumber + 1);
		document.getElementById("canRetrieveThenClose").innerHTML = "Grab you keys!";
		lockers[lockerNumber] = null;
		showPage("keyReturnedThenClose");
		console.log("return function getTheKeys with value 0");
		return;
}
// This is when the user fails ans neds to find a ride home
else if (getTheKeys === 1){
	document.getElementById("openingLocker").innerHTML = " " + (lockerNumber + 1);
  console.log("The php function is about to be called");

  var res = "<?php php_alert_tender();?>";

  console.log("The php function has been called");
	document.getElementById("canRetrieve").innerHTML = "You are too intoxicated to drive. Please find another way home.";
	showPage("keyReturned");
	console.log("return function getTheKeys with value 1")
	return;
}
else {
showPage("noLocker");
console.log("return function getTheKeys with value ?")
return;
}
console.log("return function getTheKeys with value ???")
return;
}





document.getElementById("retBTN").addEventListener("click", function () {
	hasLocker = false;
	//canRetrieve
	lockerNumber = null;
	console.log(lockers.toString() + ", and the current user is " + currentUser);
	for (i = 0; i < lockers.length; i++){
		if (lockers[i] === currentUser){
			hasLocker = true;
			lockerNumber = i;
		}
	}
	if(hasLocker)	{
		//See status from sensor
		//0 --> drunk and no keys
		//-1 --> not drunk, get keys
		getSensorData(lockerNumber);
		console.log("return function getSensorData");
}
else {
showPage("noLocker");
}
}
)

// The rest of the functions are used to redirect, or for the test page
//Excluding one
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

document.getElementById("change8").addEventListener("click", function () {
	currentUser = null;
	showPage("landing");
}
)

// This is my "reset hardware" function in the software side
document.getElementById("change9").addEventListener("click", function () {
	currentUser = null;
	particle.callFunction({ deviceId: deviceId, name: 'lockAllDoors', argument: recentDoor.toString(), auth: token });
	showPage("landing");
}
)

showPage("landing");
