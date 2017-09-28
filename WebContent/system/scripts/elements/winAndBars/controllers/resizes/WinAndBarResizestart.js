system.elements.winAndBars.controllers.resizes.WinAndBarResizestart = function() {
	this.window = function(event) {
		this.va["winAndBarNode"] = this.manager
				.moveWinToTop(event.currentTarget.parentNode);
	}
}