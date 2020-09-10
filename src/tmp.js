search by tag : span ;
innerHTML "Like"
search by tag : button;
innerHTML "Follow"
innerHTML "Following"



$(document).ready(function () {
	var links = document.getElementsByTagName("a");
	for(var i=0; i<links.length; i++) {
		if(links[i].href.indexOf("tagged=fun") > -1) {
			links[i].click();
			//alert("Found one: " + i);
		}
	}
	var links = document.getElementsByTagName("a");

	for(j = 0; j < links.length; j++) {
		if(links[j].href.indexOf("max_id=") > -1) {
			links[j].scrollIntoView();
			links[j].click();
		}
	}
});


function followAcc(msg)
{
	var tag = msg.split(":")[0];
	var task = msg.split(":")[1];
	var counter = msg.split(":")[2];
	
	if(task == "searchForTag"){
		window.location.href = "https://www.instagram.com/explore/tags/" + tag + "/";
		return "goToPost";
	}
	
	if(task == "goToPost"){		// parseInt(task) != "NaN"
		var posts = getPostsByTag(tag);
		if(posts[counter] != undefined){
			window.location.href = posts[counter].href;
			return "followAcc";
		}
		loadMore();
		return "reset";
	}
	
	if(task == "followAcc"){
		var btn = document.getElementsByTagName("button");
		var urli = window.location.href;

		for(var i = 0; i < btn.length; i++) {
			if(btn[i].innerHTML == "Follow" || btn[i].innerHTML == "Following" ){
				btn[i].click();
				window.location.href = "https://www.instagram.com/explore/tags/" + tag + "/";
				return urli;
			}
		}
		
		return "repeat";
	}
	
	return "repeat";
}

function getPostsByTag(tag){
	var list = [];
	var links = document.getElementsByTagName("a");

	for(i = 0; i < links.length; i++) {
		if(links[i].href.indexOf("tagged=" + tag) > -1) {
			list.push(links[i]);
		}
	}

	return list;
}

function loadMore(){
	var links = document.getElementsByTagName("a");

	for(i = 0; i < links.length; i++) {
		if(links[i].href.indexOf("max_id=") > -1) {
			links[i].scrollIntoView();
			links[i].click();
		}
	}
}

function selectPic(){
	var links = document.getElementsByTagName("a");
	for(var i=0; i<links.length; i++) {
		if(links[i].href.indexOf("tagged=fun") > -1) {
			links[i].click();
			//alert("Found one: " + i);
		}
	}
}



//////////
Example of html from popup.html

    <div class="menu" >
<input type="checkbox" id="showAlert" name="showAlert"/>
<label for="showAlert"><nobr>Show Alert</nobr></label></div>
Example of code snippet from popup.js

document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('#showAlert').addEventListener('change', changeHandler);
});
Of course you will need to pass this into a function like:

function changeHandler(){
   //Do Something...maybe another function showAlert(), for instance
   if(showAlert.checked){
      //do something
   }
   else{
      //do something else
   }
}

function changeHandler(e){ if(e.target.checked){ alert("Checked"); } else{ alert("Not checked"); } }

