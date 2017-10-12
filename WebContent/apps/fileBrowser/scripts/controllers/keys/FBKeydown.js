apps.fileBrowser.controllers.keys.FBKeydown = function() {
	this.rename = function(event) {
		if (event.keyCode == 13) {
			$(event.target).blur();
		}
	}
}
