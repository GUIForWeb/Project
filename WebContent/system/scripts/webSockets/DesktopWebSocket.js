system.webSockets.DesktopWebSocket = function (ip) {
	this.onMessage = function(json){
		switch (json.status) {
			case "insertDataIcon":
				this.dm.insertDataIcon(json.data);
				break;
			case "delDataIcon":
				this.dm.delDataIcon(json.data);
				break;
		}
	}
}