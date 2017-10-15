apps.themes.interfaces.controllers.mouses.InterfaceThemeMousedown = function() {
	this.input = function(event) {
		sessionStorage.iThemeTitle = event.target.title;
	}
}