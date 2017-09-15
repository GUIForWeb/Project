guiLib.controllers.subControllers.Resizestart = function() {
	this.window = function(event) {
		this.va["winAndBarNode"] = this.gm
				.moveWinToTop(event.currentTarget.parentNode);
	}
}