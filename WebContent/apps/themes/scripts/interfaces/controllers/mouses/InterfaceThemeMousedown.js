apps.themes.interfaces.controllers.mouses.InterfaceThemeMousedown = function() {
	this.input = function(event) {
		var title = event.target.title;
		sessionStorage.iThemeTitle = title;
		if(title.includes("cmenu")) {
			if (!taskArray["contextMenu"].isOnTheScreen) {
				gui.bgContextMenu.view.zIndex = gui.nodeArray["winAndBar"].winCount;
				gui.bgContextMenu.appear(10,10);
				this.cTrial.outerSelector = gui.bgContextMenu.selector;
				this.cTrial.contentSelector = this.cTrial.outerSelector.find(".contextMenuLayer");
			}
		}else {
			if (taskArray["contextMenu"].isOnTheScreen) {
				gui.bgContextMenu.disappear();
			}
		}
	}
}