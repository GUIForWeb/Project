fileBrowser.controllers.ContextMenu = function() {
	this.button = function(event) {
		if (!taskArray["contextMenu"].isOnTheScreen) {
			this.contextMenu.appear();
			this.select.contextmenu.click(event);
			this.select.end.data();
		}
	}
}