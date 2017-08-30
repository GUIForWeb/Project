function FileBrowserContextMenu(fb){
	this.fb = fb;
	this.view = new FileBrowserContextMenuView(this);
	this.isOnTheScreen = false;
	this.isInWindow = false;
	this.bgTag = this.fb.cOfWindow.parent(); 
	this.appendContextMenu = function(){
		this.isOnTheScreen = true;
		this.view.getView();
		this.bgTag.append(this.view.outerTag);
		event.preventDefault();
	}
	this.removeContextMenu = function(){
		this.view.outerTag.remove();
		this.isOnTheScreen = false;
	}
	this.remove = function(){
		this.view.contextMenuTag.remove();
	}
}
