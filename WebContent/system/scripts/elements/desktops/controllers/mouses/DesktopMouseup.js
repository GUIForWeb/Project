system.elements.desktops.controllers.mouses.DesktopMouseup = function() {
	this.selection = function(event) {
		if(this.select.mousemove.isOnGoing){
			this.select.mousemove.end(event);
		}
	}
}