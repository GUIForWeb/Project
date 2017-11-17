system.models.BackgroundContextMenu = function(){
	this.__proto__ = new Model;
	this.view = new BackgroundContextMenuView(this);
	this.isOnTheScreen = false;
	
	this.setOnTheScreen = function(flag) {
		this.isOnTheScreen = flag;
		taskArray["contextMenu"] = this;
	}
	
	this.appear = function(x,y){
		this.setOnTheScreen(true);
		if(x === undefined || y === undefined) {
			this.view.oLeft = event.clientX;
			this.view.oTop = event.clientY;
		}
		else if(x !== undefined || y !== undefined) {
			this.view.oLeft = x;
			this.view.oTop = y;
		}
		this.view.init();
		this.bgSelector.append(this.view.outerSelector);
		this.selector = this.view.outerSelector;
		event.preventDefault();
	}
	this.disappear = function(){
		this.selector.remove();
		this.setOnTheScreen(false);
	}
}