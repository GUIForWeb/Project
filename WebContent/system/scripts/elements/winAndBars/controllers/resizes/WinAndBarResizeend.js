system.elements.winAndBars.controllers.resizes.WinAndBarResizeend = function() {
	this.window = function(event) {
		this.manager.resizeend(event.currentTarget);
		this.repo.resizeend(this.va["winAndBarNode"]);
	}
}