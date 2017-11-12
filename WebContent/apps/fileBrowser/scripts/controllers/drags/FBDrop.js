apps.fileBrowser.controllers.drags.FBDrop = function() {
	this.dataItem = function(event) {
		console.log(event);
		if (this.va["dropable"]
				&& event.originalEvent.dataTransfer.files.length != 0) {
			event.preventDefault();
			this.va["selectedData"] = event.originalEvent.dataTransfer.files;
			this.va["dropable"] = false;
			if(confirm("Upload it?"))
				this.fbws.send.upload();
		}
		else if (this.va["validation"] && this.va["dropable"]) {
			this.va["dropable"] = false;
			var tmpIcon = event.originalEvent.dataTransfer.getData("icon");
			if((taskArray["clipboard"] || tmpIcon.includes("dataIcon"))&& confirm("Paste it?"))
				this.fbws.send.paste();
		} 
	}
}