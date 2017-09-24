fileBrowser.controllers.mouse.Mouseup = function() {
	this.selection = function(event) {
		if(this.select.mousemove.isOnGoing){
			this.select.mousemove.end(event);
		}
	}
}