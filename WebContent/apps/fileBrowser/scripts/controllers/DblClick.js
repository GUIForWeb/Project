fileBrowser.controllers.DblClick = function() {
	this.row = function(event) {
		console.log("db");
		if (!this.select.mousemove.isWorking) {
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
				if(type == "directory"){
					if(this.path[0].value === undefined)
						this.path[0].value = "/"+name;
					else
						this.path[0].value += "/"+name;
				}
				else if(type == ""){
					var val = this.path[0].value
					var idx = val.lastIndexOf("/");
					val = val.substring(0,idx);
					this.path[0].value = val;
				}
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
