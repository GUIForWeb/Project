system.elements.desktops.communications.DesktopWebSocket = function() {
	this.sender = new DesktopSender();
	this.sender.__proto__ = this;
	this.receiver = new DesktopReceiver();
	this.receiver.__proto__ = this;
}