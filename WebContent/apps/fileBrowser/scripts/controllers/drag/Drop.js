fileBrowser.controllers.drag.Drop = function() {
	this.dataItem = function(event) {
		if(this.va["validation"])
		if (this.va["dropable"]
				&& event.originalEvent.dataTransfer.files.length != 0) {
			event.preventDefault();
			this.va["selectedData"] = event.originalEvent.dataTransfer.files;
			this.va["dropable"] = false;
			if(taskArray["clipboard"] && confirm("Paste it?"))
				this.fbm.send.upload();
		}
		else if (this.va["dropable"]) {
			this.va["dropable"] = false;
			if(taskArray["clipboard"] && confirm("Paste it?"))
			this.fbm.send.paste();
		} 
	}
}