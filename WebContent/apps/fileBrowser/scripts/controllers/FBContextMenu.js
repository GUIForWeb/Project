apps.fileBrowser.controllers.FBContextMenu = function() {
	this.button = function(event) {
		if (!taskArray["contextMenu"].isOnTheScreen) {
			if(sessionStorage.wMode) 
				this.contextMenu.view.zIndex = gui.nodeArray.winAndBar.winCount;
			this.contextMenu.appear();
			this.select.contextmenu.click(event);
			this.select.end.data();
			event.preventDefault();
		}
	}
}