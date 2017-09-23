fileBrowser.controllers.subControllers.Dragend = function() {
	this.selection = function() {
		if(this.select.drag.isWorking)
			this.select.drag.end();
	}
}