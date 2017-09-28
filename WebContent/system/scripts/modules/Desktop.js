system.modules.Desktop = function(){
	this.controller = new DesktopController();
	this.controller = this;
	this.dm = new DesktopManager();
	this.dm.__proto__ = this.controller; 
	this.mouse = new DesktopMouse();
	this.mouse.__proto__ = this.controller;
}