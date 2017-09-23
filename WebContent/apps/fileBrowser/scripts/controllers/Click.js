fileBrowser.controllers.Click = function() {
	this.button = function(event) {
		if(!event.ctrlKey){
			this.select.cancle();
			if (taskArray["contextMenu"].isOnTheScreen) {
				taskArray["contextMenu"].disappear();
			}
			this.select.click(event);
		}
	}
	this.newFolder = function(event) {
		this.fbm.send.newFolder();
		this.contextMenu.disappear();
	}
	this.rename = function(event) {
		if (this.va["validation"] && !this.select.mousemove.isWorking
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
			this.contextMenu.disappear();
		}
	}
	this.del = function() {
		if (this.va["validation"] && confirm('Delete it?')) {
			this.fbm.send.del();
			this.contextMenu.disappear();
			this.va["selectedData"] = [];
		}
	}
	this.downlaod = function(event) {
		if (this.va["validation"] && this.va["selectedData"].length > 0
				&& this.va["selectedData"][0].type != "directory") {
			this.fbm.send.download();
			this.contextMenu.disappear();
		}
	}
	this.copy = function() {
		if (this.va["validation"]) {
			this.fbm.send.copy();
			this.contextMenu.disappear();
		}
	}
	this.cut = function() {
		if (this.va["validation"]) {
			this.fbm.send.cut();
			this.contextMenu.disappear();
		}
	}
	this.paste = function() {
		this.fbm.send.paste();
		this.contextMenu.disappear();
	}
	this.nameHead = function(){
		this.fs.string.sort("name");
		this.appendFunction();
	}
	this.dateHead = function() {
		this.fs.date.sort("dateModified");
		this.appendFunction();
	}
	this.typeHead = function() {
		this.fs.string.sort("type");
		this.appendFunction();
	}
	this.sizeHead = function() {
		this.fs.int.sort("size");
		this.appendFunction();
	}
}
