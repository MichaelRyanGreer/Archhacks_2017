<!DOCTYPE html>
<!--
Design by TEMPLATED
http://templated.co
Released for free under the Creative Commons Attribution License

Name       : Embellished
Description: A two-column, fixed-width design with dark color scheme.
Version    : 1.0
Released   : 20140207

-->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<meta name="keywords" content="" />
<meta name="description" content="" />
<link href="http://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet" />
<!-- <link href="default.css" rel="stylesheet" type="text/css" media="all" />
<link href="fonts.css" rel="stylesheet" type="text/css" media="all" /> -->
<link href="all.css" rel="stylesheet" type="text/css" media="all" />
<script type="text/javascript" src="http://cdn.jsdelivr.net/particle-api-js/5/particle.min.js"></script>
<!--[if IE 6]><link href="default_ie6.css" rel="stylesheet" type="text/css" /><![endif]-->
<script type="text/javascript">
	//function on_callPhp() {
		//console.log("Start Notification");
		//var res = "<?php php_func();?>";
		//alert (res);
		//return false;
	//}

	function on_callPhp_alert_tender() {
		console.log("Start Notification");
		var res = "<?php php_alert_tender();?>";
		alert (res);
		return false;
	}
</script>
<?php
	function php_func()	{
		$to = "jsleshem@gmail.com";
		$subject = "Test";
		$now = time();
		$message = "This email was sent from the homepage at " . $now . " in unix time.";
		mail ($to, $subject, $message);
		echo "Hello, world!";
	}
?>

<?php
	function php_alert_tender()	{
		$to = $get_username = $_POST['userNumber'];
		$subject = "Test Your Email";
		$now = time();
		$message = "Someone at your bar is drunk. Please make sure that they do not drive home. This was sent at " . $now . " in unix time.";
		mail ($to, $subject, $message);
		echo "done";
	}
?>
</head>

<body>
<div class="page" id="landing">
	<div id="header-wrapper">
		<div id="header" class="container">
			<div id="logo" style="text-align: center;"><img style="width: 100px; height: 100px" src="images/logo.png" alt=""></img>
				<h1><a href="#">Barcode</a></h1><br>
			<div id="menu">
				<form  method="post">
						Barcode: <input class="inputForm" name="userBarCode" id="userBarCode" type="text"><br>
						Or <br>
						Bar Name: <input class="inputForm" id="userBarName" type="text">
				</form>
					<button type="submit" class="button" id="loginPageBTN" >Login Here</button>
			</div>
		</div>
	</div>
	<button type="submit" class="button" id="testEmail" onclick="on_callPhp()">Test Email Here</button>
</div>
</div>


<div class="page" id="login">
	<div id="welcome" class="container">
		<div class="title">
			<h2>Welcome to <span id="currentBarName"> </span></h2>
		</div>
		<form >
				Name: <input class="inputForm" id="username" type="text"><br>
				Phone Number: <input class="inputForm" id="userNumber" type="text"><br>
				Pin: <input class="inputForm" id="userPin" type="password"><br>
		</form>
		<button class="button" id="loginBTN">Login</button>
		<button type="submit" class="button" id="testEmail" >Test Email Here</button>
		<br><br><br>
		<button class="button" id="change1">Change Bar</button>
	</div>
</div>

	<div class="page" id="homePage">
		<div id="welcome" class="container">
			<div class="title">
				<h2>Welcome, <span id="userHomeName"></span></h2>
			</div>
			<button class="button" id="reqBTN">Request Locker</button>
			<button class="button" id="retBTN">Return Keys</button>
			<br><br><br>
			<button class="button" id="logout">Logout</button>
			<button class="button" id="change2">Change Bar</button>
		</div>
	</div>

	<div class="page" id="noLocker">
		<div id="welcome" class="container">
			<div class="title">
				<h2>You have no locker, please try again</h2>
			</div>
			<button class="button" id="logout2">Logout</button>
		</div>
	</div>

	<div class="page" id="keyReturned">
		<div id="welcome" class="container">
			<div class="title">
				<h2>Your Keys are Being Processed From Locker <span id="openingLocker">Please breathe into the breathalyzer</span></h2><br>
				<h3 id="canRetrieve"></h3>
			</div>
			<br><br><br>
			<button class="button" type = "submit" id="change6" onclick="on_callPhp_alert_tender()">Logout</button>
		</div>
	</div>

	<div class="page" id="keyReturnedTryAgain">
		<div id="welcome" class="container">
			<div class="title">
				<h2>Your Keys are Being Processed From Locker <span id="openingLockerTryAgain">Please breathe into the breathalyzer</span></h2><br>
				<h3 id="canRetrieveTryAgain"></h3>
			</div>
			<br><br><br>
			<button type="submit" class="button" id="change8">Try Again</button>
		</div>
	</div>

	<div class="page" id="keyReturnedThenClose">
		<div id="welcome" class="container">
			<div class="title">
				<h2>Your Keys are Being Processed From Locker <span id="openingLockerThenClose">Please breathe into the breathalyzer</span></h2><br>
				<h3 id="canRetrieveThenClose"></h3>
			</div>
			<br><br><br>
			<button class="button" id="change9">Try Again</button>
		</div>
	</div>

	<div class="page" id="request">
		<div id="welcome" class="container">
			<div class="title">
				<h2>Request a Locker</h2>
			</div>
				<h3>Please note:
					<ul>
							<br><li>Make sure you only insert car keys</li>
							<li>Drink Responsibly</li>
							<li>Call 1-888-675-1820 for help with Alcoholism</li>
							<button class="button" id="requestConfirm">Confirm Request</button>
					</ul>
				</h3>
			<button class="button" id="change3">Logout</button>
		</div>
	</div>

	<div class="page" id="requestConfirmPage">
		<div id="welcome" class="container">
			<div class="title">
				<h2>Request Confirmed! Thanks <span id="reqName"></span></h2>
			</div>
			<h3> Please place your keys in box number:<h3><br>
				<h3 id="boxNumDisplay"><h3>
			<button class="button" id="headHome">Close Door</button>
		</div>
	</div>

	<div class="page" id="noSpace">
		<div id="welcome" class="container">
			<div class="title">
				<h2>Sorry, we are out of space</h2>
			</div>
			<h3> Please contact the bartender for additional storage<h3><br>
				<button class="button" id="change4">Logout</button>
		</div>
	</div>

	<div class="page" id="barDNE">
		<div id="welcome" class="container">
			<div class="title">
				<h2>Sorry, that bar does not exist on out system (yet...)</h2>
			</div>
			<br>
				<button class="button" id="change5">Head Home</button>
		</div>
	</div>

	<div class="page" id="incorrectPass">
		<div id="welcome" class="container">
			<div class="title">
				<h2>Sorry, Your Pin is Incorrect</h2>
			</div>
			<br>
				<button class="button" id="change7">Head Home</button>
		</div>
	</div>

<script type="text/javascript" src="script.js"></script>
</body>
</html>
