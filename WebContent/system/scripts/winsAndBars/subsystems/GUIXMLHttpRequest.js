system.winsAndBars.subsystems.GUIXMLHttpRequest = function() {
	this.getData = function(address) {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", address, false);
		xhr.send();
		return xhr.responseText;
	}
}