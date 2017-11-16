system.modules.Taskbar = function(){
	this.controller = new TaskbarController();
	this.controller.__proto__ = this;
	this.click = new TaskbarClick();
	this.click.__proto__ = this.controller;
	this.manager = new TaskbarManager();
	this.manager.__proto__ = this.controller;
	
}