
var pages = document.getElementsByClassName("page");

function showPage(id) {
	if (id == "login") {
		currentUser = null;
	}
	for(let page of pages) {
  console.log(page.id + " " + id + " ");
		if(page.id == id) {
			page.style.display = "";
		} else {
			page.style.display = "none";
		}
	}
}

document.getElementById("loginBTN").addEventListener("click", function () {
		showPage("homePage");
	}
)



showPage("login");
