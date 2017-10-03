system.elements.desktops.communications.webSockets.DesktopReceiver = function() {
	this.onMessage = function(json){
		switch (json.status) {
			case "appendDataIcon":
				this.manager.appendDataIcon(json.data);
				break;
			case "delDataIcon":
				this.manager.delDataIcon(json.data);
				break;
			case "rename":
				this.manager.rename(json.data);
				break;
		}
	}
}