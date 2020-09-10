chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	if ((msg.from === 'background') && (msg.subject === 'content')) {
		sendResponse(main(msg.mode, msg.Link));
    }
});

function main(mode, Link)
{
	var link = "none";

	if(mode[0]){
		clickLink("Like", "span");
	}

	if(mode[1] && isFollowing() == false){
		link = window.location.href;
		clickLink("Follow", "button");
	}

	if(mode[2] == false){
		clickLink("Next", "a");
	}

	if(mode[2]){
		window.location.href = Link;
		if(isFollowing()){
			clickLink("Following", "button");
		}
	}
	
	return link;
}

function clickLink(str,tag){
	var links = document.getElementsByTagName(tag);

	for(i = 0; i < links.length; i++) {
		if(links[i].innerHTML == str) {
			links[i].click();
			return links[i];
		}
	}
	return false;
}

function isFollowing(){
	var links = document.getElementsByTagName("button");

	for(i = 0; i < links.length; i++) {
		if(links[i].innerHTML == "Following") {
			return true;
		}
	}
	return false;
}

