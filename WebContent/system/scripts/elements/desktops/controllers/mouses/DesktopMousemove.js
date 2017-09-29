system.elements.desktops.controllers.mouses.DesktopMousemove = function() {
	this.selection = function(event) {
		if(this.select.mousemove.isOnGoing)
		if (event.ctrlKey)
			this.select.mousemove.onGoingWtihCtrl(event);
		else 
			this.select.mousemove.onGoing(event);
	}
}