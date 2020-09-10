window.addEventListener('load', function()
{
    document.getElementById("btnStart").addEventListener("click", function(){ chrome.runtime.sendMessage({ from: 'popup', subject: 'Start' , msg: start() });});
	document.getElementById("btnStop").addEventListener("click", function(){ chrome.runtime.sendMessage({ from: 'popup', subject: 'Stop' });});
	chrome.runtime.sendMessage({ from: 'popup', subject: 'Links' }, function(response){ document.getElementById('list').value = response.msg; });
});

function start(){
	var msg = [];
	msg.push(document.getElementById("like").checked);
	msg.push(document.getElementById("follow").checked);
	msg.push(document.getElementById("unfollow").checked);
	msg.push(document.getElementById("delay").value);
	msg.push(document.getElementById("list").value.split('\n'));
	return msg;
}
