guiLib.controllers.ContextMenu = function() {
	this.cButton = function(event) {
		/*
		 if (taskArray["contextMenu"].isOnTheScreen)
			taskArray["contextMenu"].disappear();
		 */
		if (!taskArray["contextMenu"].isOnTheScreen) {
			this.bgContextMenu.view.contextPath = this.contextPath;
			this.bgContextMenu.view.contentPath = "background";
			this.bgContextMenu.view.zIndex = this.nodeArray["winAndBar"].winCount;
			this.bgContextMenu.appear();
		}
	}
}