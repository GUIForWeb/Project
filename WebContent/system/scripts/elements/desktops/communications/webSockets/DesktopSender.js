system.elements.desktops.communications.webSockets.DesktopSender = function() {
	this.json = {
		"app" : "system.webSockets.DesktopWebSocket",
		"data" : {}
	}
	this.rename = function(json) {
		this.json.data = {
			"status" : "rename",
			"src" : this.va["prevData"][0].name,
			"dest" : this.va["selectedData"][0].name
		}
		gui.ws.send(this.json);
	}
	this.dataIconXY = function(json) {
		this.json.data = Object.assign({}, {
			"status" : "dataIconXY"
		}, json);
		gui.ws.send(this.json);
	}
	this.iconXY = function(json) {
		this.json.data = Object.assign({}, {
			"status" : "iconXY"
		}, json);
		gui.ws.send(this.json);
	}
	this.dataIconXYs = function(jsonArray) {
		this.json.data = Object.assign({}, {
			"status" : "dataIconXYs"
		}, {
			"data" : jsonArray
		});
		var json = this.json
		if (jsonArray.length != 0)
			gui.ws.onopen(function() {
				gui.ws.send(json);
			});
	}
}