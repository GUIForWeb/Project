guiLib.subsystem.IconManager = function() {
	this.json = {
		"app" : "system.controller.IconManager",
		"data" : {}
	}
	this.iconXY = function(json) {
		this.json.data = Object.assign({}, {
			"status" : "iconXY"
		}, json);
		this.ws.send(this.json);
	}
}