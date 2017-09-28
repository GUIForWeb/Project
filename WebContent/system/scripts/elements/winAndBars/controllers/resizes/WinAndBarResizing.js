system.elements.winAndBars.controllers.resizes.WinAndBarResizing = function() {
	this.window = function(event) {
		this.manager.resizing(event.currentTarget);
	}
}