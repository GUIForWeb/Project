system.webSockets.DesktopWebSocket = function (ip) {
	this.onMessage = function(json){
		switch (json.status) {
			case "appendDataIcon":
				this.manager.appendDataIcon(json.data);
				break;
			case "delDataIcon":
				this.manager.delDataIcon(json.data);
				break;
		}
	}
}