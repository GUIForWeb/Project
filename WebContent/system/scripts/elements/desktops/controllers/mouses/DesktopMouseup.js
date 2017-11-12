system.elements.desktops.controllers.mouses.DesktopMouseup = function() {
	this.selection = function(event) {
		if(this.select.mousemove.isOnGoing){
			this.select.mousemove.end(event);
			this.select.end.data();
		}
	}
	this.background = function(event) {
		/*
		if (event.button == 0 && taskArray["contextMenu"].isOnTheScreen) {
			taskArray["contextMenu"].disappear();
		}
		*/
	}
}