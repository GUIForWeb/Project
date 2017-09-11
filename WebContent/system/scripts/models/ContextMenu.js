function ContextMenu(){
		this.__proto__ = new Model;
		this.view = new ContextMenuView(this);
		this.isOnTheScreen = false;
		this.appendContextMenu = function(){
			this.isOnTheScreen = true;
			this.view.getView();
			this.bgSelector.append(this.view.contextMenuSelector);
			event.preventDefault();
		}
		this.remove = function(){
			this.view.contextMenuSelector.remove();
		}
}