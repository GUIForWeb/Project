fileBrowser.controllers.subControllers.Drop = function() {
	this.dataItem = function(event) {
		if(this.va["validation"])
		if (this.va["dropable"]
				&& event.originalEvent.dataTransfer.files.length != 0) {
			event.preventDefault();
			this.va["selectedData"] = event.originalEvent.dataTransfer.files;
			this.fbm.send.upload();
			this.va["dropable"] = false;
		}
		else if (this.va["dropable"]) {
			console.log("drop");
			this.fbm.send.paste();
			this.va["dropable"] = false;
			console.log(this.va["selectedData"]);
		} 
	}
}