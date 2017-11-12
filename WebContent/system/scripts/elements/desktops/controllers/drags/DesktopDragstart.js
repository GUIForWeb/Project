system.elements.desktops.controllers.drags.DesktopDragstart = function() {
	this.icon = function(event) {
		event.originalEvent.dataTransfer.setData("icon", event.currentTarget.id);
		this.socket.sender.copy();
	}
}