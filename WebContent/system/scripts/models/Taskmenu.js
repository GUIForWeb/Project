system.models.Taskmenu = function(){
	this.__proto__ = new Model;
	this.view = new TaskmenuView(this);
	this.isOnTheScreen = false;
	this.init = function() {
		this.view.init();
		this.selector = this.view.taskmenuSelector;
	}
	this.appear = function() {
		this.taskbarSelector.append(this.selector);
		this.isOnTheScreen = true;
		this.view.initEvent();
	}
	this.disappear = function() {
		if(this.isOnTheScreen) {
			this.selector.remove();
			this.isOnTheScreen = false;
		}
	}
	this.setTaskbarSelector = function(taskbarSelector){
		this.taskbarSelector = taskbarSelector;
	}
}