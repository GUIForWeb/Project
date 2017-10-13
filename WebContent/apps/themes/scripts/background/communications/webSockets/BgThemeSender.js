apps.themes.backgrounds.communications.webSockets.BgThemeSender = function() {
	this.json = {
			"app" : "apps.themes.webSockets.ThemeWebSocket",
			"data" : {}
		}
	this.imgFileData = function() {
		this.json.data = {
			"status" : "imgFileData",
			"data" : this.va["imgFileData"]
		}
		gui.ws.send(this.json);
	}
	this.empty = function() {
		this.json.data = {
			"status" : "empty"
		}
		gui.ws.send(this.json);
	}
}