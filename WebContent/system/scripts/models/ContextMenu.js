guiLib.models.ContextMenu = function(){
	this.__proto__ = new Model;
	this.view = new ContextMenuView(this);
	this.isOnTheScreen = false;
	this.setOnTheScreen = function(flag) {
		this.isOnTheScreen = flag;
		taskArray["contextMenu"] = this;
	}
	
	this.appear = function(){
		this.setOnTheScreen(true);
		this.view.getView();
		this.bgSelector.append(this.view.contextMenuSelector);
		event.preventDefault();
	}
	this.disappear = function(){
		this.view.contextMenuSelector.remove();
		this.setOnTheScreen(false);
	}
}