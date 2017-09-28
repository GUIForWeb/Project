system.modules.WinAndBar = function(){
	this.controller = new WinAndBarController();
	this.controller.__proto__ = this;
	this.manager = new WinAndBarManager();
	this.manager.__proto__ = this.controller;
	this.repo = new WinAndBarRepository();
	this.repo.__proto__ = this.controller;
	
	this.dblclick = new WinAndBarDblclick();
	this.dblclick.__proto__ = this.controller;
	this.change = new WinAndBarChange();
	this.change.__proto__ = this.controller;
	this.click = new WinAndBarClick();
	this.click.__proto__ = this.controller;
	this.contextmenu = new WinAndBarContextMenu();
	this.contextmenu.__proto__ = this.controller;
	this.drag = new WinAndBarDrag();
	this.drag.__proto__ = this.controller;
	this.mouse = new WinAndBarMouse();
	this.mouse.__proto__ = this.controller;
	this.resize = new WinAndBarResize();
	this.resize.__proto__ = this.controller;
	this.request = new WinAndBarXMLHttpRequest();
	this.request.__proto__ = this.controller;
}