system.elements.desktops.subsystems.DesktopSender = function() {
	this.json = {
		"app" : "system.webSockets.DesktopWebSocket",
		"data" : {}
	}
	this.dataIconXY = function(json) {
		this.json.data = Object.assign({}, {
			"status" : "dataIconXY"
		}, json);
		this.ws.send(this.json);
	}
	this.iconXY = function(json) {
		this.json.data = Object.assign({}, {
			"status" : "iconXY"
		}, json);
		this.ws.send(this.json);
	}
	this.dataIconXYs = function(jsonArray) {
		this.json.data = Object.assign({}, {
			"status" : "dataIconXYs"
		}, {"data":jsonArray});
		var json = this.json
		if(jsonArray.length != 0)
		this.ws.onopen(function(){
			gui.ws.send(json);
		});
	}
}