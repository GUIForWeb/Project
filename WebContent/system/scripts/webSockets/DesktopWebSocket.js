system.webSockets.DesktopWebSocket = function (ip) {
	this.onMessage = function(json){
		switch (json.status) {
			case "refresh":
				this.dm.refresh(json.data);
				break;
		}
	}
}