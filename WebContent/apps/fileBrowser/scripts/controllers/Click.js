fileBrowser.controllers.Click = function() {
	this.button = function(event) {
		if(event.ctrlKey)
			this.select.ctrl.choose(event);
		else {
			this.select.cancle();
			var selector = $(event.target.parentNode);
			if(selector.prop("tagName") == "TR")
				$(event.target.parentNode).css("background-color","dimgray");
		}
	}
	this.newFolder = function(event) {
		this.fbm.send.newFolder();
		this.contextMenu.removeContextMenu();
	}
	this.rename = function(event) {
		if (this.va["validation"] && !this.ds.isWorking
				&& Object.keys(this.va["selectedData"][0]).length == 2) {
			var nameTd = this.tag["s"].children().first();
			nameTd.attr("contenteditable", true);
			var id = this.id;
			nameTd.focusout(function(event) {
				taskArray["fileBrowser"][id].focusout.rename(event);
			});
			nameTd.keydown(function(event) {
				taskArray["fileBrowser"][id].keydown.rename(event);
			});
			this.va["prevData"] = this.va["selectedData"];
			nameTd.focus();
			this.contextMenu.removeContextMenu();
		}
	}
	this.del = function() {
		if (this.va["validation"] && confirm('Delete it?')) {
			this.fbm.send.del();
			this.contextMenu.removeContextMenu();
			this.va["selectedData"] = [];
		}
	}
	this.downlaod = function(event) {
		if (this.ds.isWorking)
			this.va["selectedData"] = this.ds.fileList();
		if (this.va["validation"] && this.va["selectedData"].length > 0
				&& this.va["selectedData"][0].type != "directory") {
			this.contextMenu.removeContextMenu();
			this.fbm.send.download();
		}
	}
	this.copy = function() {
		if (this.va["validation"]) {
			this.fbm.send.copy();
			this.contextMenu.removeContextMenu();
		}
	}
	this.cut = function() {
		if (this.va["validation"]) {
			this.fbm.send.cut();
			this.contextMenu.removeContextMenu();
		}
	}
	this.paste = function() {
		this.fbm.send.paste();
		this.contextMenu.removeContextMenu();
	}
	this.nameHead = function(){
		this.fs.string.sort("name");
	}
	this.dateHead = function() {
		this.fs.date.sort("dateModified");
	}
	this.typeHead = function() {
		this.fs.string.sort("type");
	}
	this.sizeHead = function() {
		this.fs.int.sort("size");
	}
}
