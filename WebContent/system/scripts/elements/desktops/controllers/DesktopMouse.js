system.elements.desktops.controllers.DesktopMouse = function() {
	this.out = new DesktopMouseout();
	this.out.__proto__ = this;
	this.over = new DesktopMouseover();
	this.over.__proto__ = this;
	this.down = new DesktopMousedown();
	this.down.__proto__ = this;
	this.move = new DesktopMousemove();
	this.move.__proto__ = this;
	this.up = new DesktopMouseup();
	this.up.__proto__ = this;
	
}