system.winsAndBars.controllers.resizes.Resizing = function() {
	this.window = function(event) {
		this.gm.resizing(event.currentTarget);
	}
}