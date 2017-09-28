system.desktops.controllers.DesktopMouse = function() {
	this.out = new DesktopMouseout();
	this.out.__proto__ = this;
	this.over = new DesktopMouseover();
	this.over.__proto__ = this;
}