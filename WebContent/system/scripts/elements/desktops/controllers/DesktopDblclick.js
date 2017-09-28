system.elements.desktops.controllers.DesktopDblclick = function() {
	this.icon = function(event) {
		var id = event.currentTarget.id;
		var iconObj = this.iconArray[id];
		this.configure.manager.execute.app(iconObj);
	}
}