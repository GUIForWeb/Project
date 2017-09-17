fileBrowser.controllers.Keydown = function() {
	this.rename = function(event) {
		if (event.keyCode == 13) {
			this.focusout.rename(event);
		}
	}
}
