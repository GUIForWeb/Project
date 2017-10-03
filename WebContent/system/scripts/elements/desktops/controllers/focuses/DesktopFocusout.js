system.elements.desktops.controllers.focuses.DesktopFocusout = function() {
	this.rename = function(event) {
		this.setScriptTag(event.target);
		var tagId = this.tag["s"].parent().prop("id");
		var icon = this.iconArray[tagId];
		var json = icon.json;
		this.va["selectedData"] = [ {
			"name" : this.tag["s"].html(),
			"type" : json.type
		} ];
		this.tag["s"].removeAttr("contenteditable");
		if (JSON.stringify(this.va["selectedData"][0]) != JSON.stringify(this.va["prevData"][0])){
			var newName = this.va["selectedData"][0].name; 
			icon.name = newName;
			json.name = newName;
			this.socket.sender.rename();
		}
	}
}