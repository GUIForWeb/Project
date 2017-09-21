fileBrowser.controllers.ContextMenu = function() {
	this.button = function(event) {
		if (!this.contextMenu.isOnTheScreen) {
			this.select.contextmenu.dataItem(event);
			
			console.log(this.select.drag.isWorking);
			console.log(this.select.ctrl.isWorking);
			console.log(this.va["isData"]);
			if(this.va["isData"] && !this.select.drag.isWorking && !this.select.ctrl.isWorking)
				this.select.end.dataItem();
			else
				this.select.end.dataItems();
		}
	}
}