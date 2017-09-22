guiLib.controllers.ContextMenu = function() {
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
		}
	}
}