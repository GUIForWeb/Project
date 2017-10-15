apps.themes.interfaces.controllers.InterfaceThemeMouse = function() {
	this.up = new InterfaceThemeMouseup();
	this.up.__proto__ = this;
	this.down = new InterfaceThemeMousedown();
	this.down.__proto__ = this;
}