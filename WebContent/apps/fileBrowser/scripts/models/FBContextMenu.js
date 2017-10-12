apps.fileBrowser.models.FBContextMenu = function() {
	this.view = new FBContextMenuView();
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
	}
	this.disappear = function() {
		this.view.outerSelector.remove();
		this.setOnTheScreen(false);
	}
}
