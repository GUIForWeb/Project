function FileBrowserContextMenu(fb){
	this.fb = fb;
	this.view = new FileBrowserContextMenuView(this);
	this.isOnTheScreen = false;
	this.isInWindow = false;
	this.appendContextMenu = function(){
		this.isOnTheScreen = true;
		this.view.getView();
		this.bgTag.append(this.view.outerTag);
		event.preventDefault();
	}
	this.remove = function(){
		this.view.contextMenuTag.remove();
	}
}
