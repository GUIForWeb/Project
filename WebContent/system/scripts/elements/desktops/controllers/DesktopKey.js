system.elements.desktops.controllers.DesktopKey = function() {
	this.down = new DesktopKeydown();
	this.down.__proto__ = this;
	this.up = new DesktopKeyup();
	this.up.__proto__ = this;
	this.press = new DesktopKeypress();
	this.press.__proto__ = this;
}