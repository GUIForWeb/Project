system.elements.desktops.controllers.drags.DesktopDragstart = function() {
	this.icon = function(event) {
		event.originalEvent.dataTransfer.setData("icon", event.currentTarget.id);
		console.log(this.select.mousemove.isWorking);
		this.select.end.data();
		this.socket.sender.copy();
	}
}