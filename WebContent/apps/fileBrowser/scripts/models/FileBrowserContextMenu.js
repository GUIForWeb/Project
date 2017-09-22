fileBrowser.models.FileBrowserContextMenu = function() {
	this.view = new FileBrowserContextMenuView();
	this.view.__proto__ = this;
	this.isOnTheScreen = false;
	this.setOnTheScreen = function(flag){
		this.isOnTheScreen = flag;
		taskArray["contextMenu"] = this;
	}
	this.appear = function() {
		this.bgSelector = $("body");
		this.setOnTheScreen(true);
		this.view.getView();
		this.bgSelector.append(this.view.outerSelector);
		event.preventDefault();
	}
	this.disappear = function() {
		this.view.outerSelector.remove();
		this.setOnTheScreen(false);
	}
}
