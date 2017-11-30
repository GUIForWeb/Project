apps.themes.interfaces.controllers.mouses.InterfaceThemeMousedown = function() {
	this.input = function(event) {
		var title = event.target.title;
		sessionStorage.iThemeTitle = title;
		if(title.includes("cmenu") && !taskArray["contextMenu"].isOnTheScreen) {
			gui.bgContextMenu.view.zIndex = gui.nodeArray["winAndBar"].winCount;
			gui.bgContextMenu.appear(10,10);
			this.cmTrial.outerSelector = gui.bgContextMenu.selector;
			this.cmTrial.contentSelector = this.cmTrial.outerSelector.find(".contextMenuListLayer");
		}else if(title.includes("tmenu") && !gui.taskbar.manager.menu.isOnTheScreen){
			gui.taskbar.manager.menu.appear();
			this.tmTrial.outerSelector = gui.taskbar.manager.menu.selector;
			this.tmTrial.listSelector = this.tmTrial.outerSelector.find(".taskmenuListLayer");
		}
		if (!title.includes("cmenu") && taskArray["contextMenu"].isOnTheScreen) 
			gui.bgContextMenu.disappear();
		else if(!title.includes("tmenu") && gui.taskbar.manager.menu.isOnTheScreen)
			gui.taskbar.manager.menu.disappear();
	}
}