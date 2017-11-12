apps.fileBrowser.controllers.FBDblClick = function() {
	this.row = function(event) {
		if (!this.select.mousemove.isWorking) {
			var tr = event.currentTarget;
			var td = $(tr).find("td");
			if (td.length) {
				var name = $(td[0]).children().html().trim();
				var type = $(td[2]).children().html().trim();
				this.va["selectedData"] = [ {
					"name" : name,
					"type" : type
				} ];
				this.fbws.send.open();
				if(type == "inode/directory"){
					if(this.path[0].value === undefined)
						this.path[0].value = gui.fileSeparator + name;
					else
						this.path[0].value += gui.fileSeparator+name;
				}
				else if(type == ""){
					var val = this.path[0].value
					var idx = val.lastIndexOf(gui.fileSeparator);
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
