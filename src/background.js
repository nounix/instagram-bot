var state;
var mode = [];
var links = [];
var counter = 0;

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	if (msg.subject == "Links"){
		sendResponse({ msg: links });
	}
	if (msg.subject == "Start"){
		for(i = 0; i < 3; i++) { mode.push(msg.msg[i]); }
		if(mode[2] == true){ links = msg.msg[4]; }
		state = setInterval(function(){ communicateWithContent() }, msg.msg[3] * 1000);
	}
	if (msg.subject == "Stop"){
		clearInterval(state);
		chrome.browserAction.setBadgeText({text: ""});
		if(mode[1]){ window.prompt("Copy to clipboard: Ctrl+C, Enter", links); }
		counter = 0;
		links = [];
		mode = [];
	}
});

function communicateWithContent(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		if(mode[2] == true){
			if(counter < links.length){
				chrome.tabs.sendMessage(tabs[0].id, { from: 'background', subject: 'content' , mode: mode, Link: links[counter] }, updateBot);
			} else { clearInterval(state); }
		} 
		if(mode[2] == false) {
			chrome.tabs.sendMessage(tabs[0].id, { from: 'background', subject: 'content' , mode: mode, Link: 0 }, updateBot);
		}
	});
}

function updateBot(link){
	if(link != undefined && link.indexOf("https://www.instagram.com/") > -1) {links += link + '\n'; }
	counter++;
	chrome.browserAction.setBadgeText({text: counter.toString()});
}

