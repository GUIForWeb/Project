system.elements.desktops.controllers.drags.DesktopDragstart = function() {
	this.icon = function(event) {
		event.originalEvent.dataTransfer.setData("text", event.currentTarget.id);
	}
}