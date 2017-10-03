system.elements.desktops.controllers.DesktopFocus = function() {
	this.out = new DesktopFocusout();
	this.out.__proto__ = this;
	this.in = new DesktopFocusin();
	this.in.__proto__ = this;
}