fileBrowser.controllers.subControllers.Draging = function() {
	this.selection = function(event) {
		if(this.select.drag.isWorking)
		if (event.ctrlKey)
			this.select.drag.onGoingWtihCtrl(event);
		else
			this.select.drag.onGoing(event);
		
	}
}