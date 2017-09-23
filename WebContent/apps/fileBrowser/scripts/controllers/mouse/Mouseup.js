fileBrowser.controllers.mouse.Mouseup = function() {
	this.selection = function() {
		if(this.select.mousemove.isOnGoing){
			this.select.mousemove.end();
		}
	}
}