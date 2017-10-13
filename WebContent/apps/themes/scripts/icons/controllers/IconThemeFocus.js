apps.themes.icons.controllers.IconThemeFocus = function() {
	this.blur = new IconThemeBlur();
	this.blur.__proto__ = this;
	this.ing = new IconThemeFocusing();
	this.ing.__proto__ = this;
}