fileBrowser.controllers.Focusout = function() {
	this.rename = function(event) {
		this.setScriptTag(event.target.parentNode);
		this.va["selectedData"] = [ {
			"name" : this.tag["t"].children[0].innerHTML,
			"type" : this.tag["t"].children[2].innerHTML
		} ];
		console.log(this.va["selectedData"])
		this.tag["s"].children().first().removeAttr("contenteditable");
		if (JSON.stringify(this.va["selectedData"][0]) != JSON
				.stringify(this.va["prevData"][0])) {
			for (di = 0; di < this.va["data"].length; di++) {
				if (this.va["data"][di].name == this.va["prevData"][0].name) {
					this.va["data"][di].name = this.va["selectedData"][0].name;
					break;
				}
			}
			this.fbws.send.rename();
		}
	}
}
