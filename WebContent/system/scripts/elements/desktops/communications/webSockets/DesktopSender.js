system.elements.desktops.communications.webSockets.DesktopSender = function() {
	this.json = {
		"app" : "system.webSockets.DesktopWebSocket",
		"data" : {}
	}
	this.paste = function() {
		this.json.data = {
			"status" : "paste"
		}
		this.ws.send(this.json);
		this.va["pasteFlag"] = false;
	}
	this.cut = function() {
		this.json.data = {
			"status" : "cut",
			"data" : this.va["selectedData"]
		}
		this.ws.send(this.json);
		this.va["selectedData"] = [];
	}
	this.copy = function() {
		this.json.data = {
			"status" : "copy",
			"data" : this.va["selectedData"]
		}
		this.ws.send(this.json);
		this.va["selectedData"] = [];
	}
	this.rename = function(json) {
		this.json.data = {
			"status" : "renameOnDesktop",
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