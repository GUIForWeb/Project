guiLib.controllers.subControllers.Dragstart = function() {
	this.head = function(event) {
		var winTag = event.currentTarget.parentNode.parentNode;
		this.gm.moveWinToTop(winTag);
	}
}