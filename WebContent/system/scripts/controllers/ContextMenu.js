guiLib.controllers.ContextMenu = function() {
	this.cButton = function() {
		if (!this.bgContextMenu.isOnTheScreen) {
			this.bgContextMenu.view.contextPath = this.contextPath;
			this.bgContextMenu.view.contentPath = "background";
			this.bgContextMenu.view.zIndex = this.nodeArray["winAndBar"].winCount;
			this.bgContextMenu.appendContextMenu();
		}
	}
}