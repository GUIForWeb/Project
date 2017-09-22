fileBrowser.controllers.ContextMenu = function() {
	this.button = function(event) {
		/*
		if (taskArray["contextMenu"].isOnTheScreen)
			taskArray["contextMenu"].disappear();
		*/
		if (!taskArray["contextMenu"].isOnTheScreen) {
			this.contextMenu.appear();
			this.select.contextmenu.dataItem(event);
			if(this.va["isData"] && !this.select.drag.isWorking && !this.select.ctrl.isWorking)
				this.select.end.dataItem();
			else
				this.select.end.dataItems();
		}
	}
}