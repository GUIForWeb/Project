fileBrowser.controllers.DblClick = function() {
	this.row = function(event) {
		if (!this.ds.isWorking) {
			var tr = event.currentTarget;
			var td = $(tr).find("td");
			if (td.length) {
				var name = $(td[0]).html().trim();
				var type = $(td[2]).html().trim();
				this.va["selectedData"] = [ {
					"name" : name,
					"type" : type
				} ];
				this.fbm.send.open();
			}
		}
	}
	this.eButton = function(tag) {
		if (tag.tagName == "TR") {
			event.stopPropagation();
			this.submit("choose", this.id + "&" + tag.children[2].innerHTML
					+ "&" + tag.children[0].innerHTML);
		}
	}
}
