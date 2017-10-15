apps.themes.interfaces.controllers.InterfaceThemeFocus = function() {
	this.out = new InterfaceThemeFocusout();
	this.out.__proto__ = this;
	this.in = new InterfaceThemeFocusin();
	this.in.__proto__ = this;
}