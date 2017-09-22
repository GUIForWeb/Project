system.subsystem.IconManager = function() {
	this.json = {
		"app" : "system.webSockets.IconWebSocket",
		"data" : {}
	}
	this.iconXY = function(json) {
		this.json.data = Object.assign({}, {
			"status" : "iconXY"
		}, json);
		this.ws.send(this.json);
	}
}