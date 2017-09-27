system.webSockets.DesktopWebSocket = function (ip) {
	this.onMessage = function(json){
		switch (json.status) {
			case "appendDataIcon":
				this.dm.appendDataIcon(json.data);
				break;
			case "delDataIcon":
				this.dm.delDataIcon(json.data);
				break;
		}
	}
}