system.modules.Desktop = function(){
	this.controller = new DesktopController();
	this.controller.__proto__ = this;
	this.manager = new DesktopManager();
	this.manager.__proto__ = this.controller; 
	this.mouse = new DesktopMouse();
	this.mouse.__proto__ = this.controller;
	this.dblclick = new DesktopDblclick();
	this.dblclick.__proto__ = this.controller;
	this.click = new DesktopClick();
	this.click.__proto__ = this.controller;
	this.drag = new DesktopDrag();
	this.drag.__proto__ = this.controller;
	this.contextmenu = new DesktopContextMenu();
	this.contextmenu.__proto__ = this.controller;
	this.socket = new DesktopWebSocket();
	this.socket.__proto__ = this.controller;
	this.select = new DesktopSelect();
	this.select.__proto__ = this.controller;
}