fileBrowser.controllers.Keydown = function() {
	this.rename = function(event) {
		if (event.keyCode == 13) {
			$(event.target).blur();
		}
	}
}
