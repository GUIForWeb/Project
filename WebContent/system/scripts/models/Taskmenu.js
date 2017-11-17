system.models.Taskmenu = function(){
	this.__proto__ = new Model;
	this.view = new TaskmenuView(this);
	this.isDisplayed = false;
	this.init = function() {
		this.view.init();
		this.selector = this.view.taskmenuSelector;
	}
	this.appear = function() {
		this.taskbarSelector.append(this.selector);
		this.isDisplayed = true;
		this.view.initEvent();
	}
	this.disappear = function() {
		if(this.isDisplayed) {
			this.selector.remove();
			this.isDisplayed = false;
		}
	}
	this.setTaskbarSelector = function(taskbarSelector){
		this.taskbarSelector = taskbarSelector;
	}
}