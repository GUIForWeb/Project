system.webSockets.DesktopWebSocket = function (ip) {
	this.onMessage = function(json){
		switch (json.status) {
		case "update":
			this.dm.update(json.data);
			break;
		}
	}
}