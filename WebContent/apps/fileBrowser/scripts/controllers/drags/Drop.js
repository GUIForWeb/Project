fileBrowser.controllers.drags.Drop = function() {
	this.dataItem = function(event) {
		if (this.va["dropable"]
				&& event.originalEvent.dataTransfer.files.length != 0) {
			event.preventDefault();
			console.log("upload");
			this.va["selectedData"] = event.originalEvent.dataTransfer.files;
			this.va["dropable"] = false;
			if(confirm("Upload it?"))
				this.fbws.send.upload();
		}
		else if (this.va["validation"] && this.va["dropable"]) {
			this.va["dropable"] = false;
			if(taskArray["clipboard"] && confirm("Paste it?"))
			this.fbws.send.paste();
		} 
	}
}