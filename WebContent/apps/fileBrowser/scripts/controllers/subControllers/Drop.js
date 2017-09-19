fileBrowser.controllers.subControllers.Drop = function() {
	this.dataItem = function(event) {
		if (!this.select.drag.isWorking && this.va["dropable"] && this.va["dataItem"]) {
			this.fbm.send.paste();
			this.va["dropable"] = false;
			this.va["dataItem"] = false;
		} else if (this.va["dropable"]
				&& event.originalEvent.dataTransfer.files.length != 0) {
			event.preventDefault();
			this.va["selectedData"] = event.originalEvent.dataTransfer.files;
			this.fbm.send.upload();
			this.va["dropable"] = false;
		}
	}
}