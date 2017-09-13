function FileBrowserContextMenu(){
	this.view = new FileBrowserContextMenuView();
	this.view.__proto__ = this;
	this.isOnTheScreen = false;
	this.isInWindow = false;
	this.appendContextMenu = function(){
		this.bgSelector = this.cOfWindow.parent(); 
		this.isOnTheScreen = true;
		this.view.getView();
		this.bgSelector.append(this.view.outerSelector);
		event.preventDefault();
	}
	this.removeContextMenu = function(){
		this.view.outerSelector.remove();
		this.isOnTheScreen = false;
	}
	this.remove = function(){
		this.view.contextMenuSelector.remove();
	}
}