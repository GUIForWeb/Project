system.elements.desktops.controllers.keys.DesktopKeydown = function() {
	this.rename = function(event) {
		if (event.keyCode == 13) {
			console.log("down");
			//$(event.target).blur();
		}
	}
}