system.elements.desktops.controllers.DesktopContextMenu = function() {
	this.background = function(event) {
		/*
		 if (taskArray["contextMenu"].isOnTheScreen)
			taskArray["contextMenu"].disappear();
		 */
		if (!taskArray["contextMenu"].isOnTheScreen) {
			this.bgContextMenu.view.zIndex = this.nodeArray["winAndBar"].winCount;
			this.bgContextMenu.appear();
		}
	}
	this.icon = function(){
		if (!taskArray["contextMenu"].isOnTheScreen) {
			this.iconContextMenu.view.zIndex = this.nodeArray["winAndBar"].winCount;
			this.iconContextMenu.appear();
			this.select.contextmenu.click(event);
			this.select.end.data();
			event.preventDefault();
		}
	}
}