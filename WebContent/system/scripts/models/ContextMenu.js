function ContextMenu(){
		this.__proto__ = new Model;
		this.view = new ContextMenuView(this);
		this.isOnTheScreen = false;
		this.appendContextMenu = function(){
			this.isOnTheScreen = true;
			this.view.getView();
			this.bgTagArray.append(this.view.contextMenuTagArray);
			event.preventDefault();
		}
		this.remove = function(){
			this.view.contextMenuTagArray.remove();
		}
}