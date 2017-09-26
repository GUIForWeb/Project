fileBrowser.webSockets.FBWebSocket = function() {
	this.json = {};
	this.json.app = "apps.fileBrowser.webSockets.FBWebSocket";
	this.send = new FBSender();
	this.send.__proto__ = this;
	this.receive = new FBReceiver();
	this.receive.__proto__ = this;
	this.onMessage = function(json) {
		switch (json.status) {
		case "reload":
			this.receive.reload(json.data);
			this.va["path"] = json.path;
			break;
		case "multiReload":
			this.receive.multiReload(json.data);
			this.va["path"] = json.path;
			break;
		case "multiReloadForUpload":
			this.receive.multiReloadForUpload(json.data);
			this.va["path"] = json.path;
			break;
		case "multiplexReload":
			this.receive.multiplexReload(json.data);
			this.va["path"] = json.path;
			break;
		case "%":
			this.receive.byteCount(json.byteCount);
			break;
		case "download":
			this.receive.download(json.data);
			break;
		}
	}
}