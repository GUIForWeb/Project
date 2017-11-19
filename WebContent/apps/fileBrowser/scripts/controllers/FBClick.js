apps.fileBrowser.controllers.FBClick = function() {
	this.row = function(event) {
		if(!(event.ctrlKey || event.shiftKey)){
			this.select.cancle.all();
			if (taskArray["contextMenu"].isOnTheScreen) {
				taskArray["contextMenu"].disappear();
			}
			this.select.click.row(event);
			this.select.end.data(event);
		}
	}
	this.newFolder = function(event) {
		this.fbws.send.newFolder();
		taskArray["contextMenu"].disappear();
	}
	this.rename = function(event) {
		if (this.va["validation"] && !this.select.mousemove.isWorking) {
			var nameDiv = this.tag["s"].children().children().first();
			console.log(nameDiv);
			nameDiv.attr("contenteditable", true);
			var id = this.id;
			nameDiv.focusout(function(event) {
				taskArray["fileBrowser"][id].focus.out.rename(event);
			});
			nameDiv.keydown(function(event) {
				taskArray["fileBrowser"][id].key.down.rename(event);
			});
			this.va["prevData"] = this.va["selectedData"];
			nameDiv.focus();
			taskArray["contextMenu"].disappear();
		}
	}
	this.del = function() {
		if (this.va["validation"] && confirm('Delete it?')) {
			this.fbws.send.del();
			taskArray["contextMenu"].disappear();
			this.va["selectedData"] = [];
		}
	}
	this.downlaod = function(event) {
		if (this.va["validation"] && this.va["selectedData"].length > 0
				&& this.va["selectedData"][0].type != "directory") {
			this.fbws.send.download();
			taskArray["contextMenu"].disappear();
		}
	}
	this.copy = function() {
		if (this.va["validation"]) {
			this.fbws.send.copy();
			taskArray["contextMenu"].disappear();
			taskArray["clipboard"] = true;
		}
	}
	this.cut = function() {
		if (this.va["validation"]) {
			this.fbws.send.cut();
			taskArray["contextMenu"].disappear();
			taskArray["clipboard"] = true;
		}
	}
	this.paste = function() {
		this.contextMenu.disappear();
		if(taskArray["clipboard"] && confirm("Paste it?")){
			this.fbws.send.paste();
			taskArray["clipboard"] = false;
		}
	}
	this.nameHead = function(){
		this.fs.string.sort("name");
		this.appendFunctionForTable();
	}
	this.dateHead = function() {
		this.fs.date.sort("dateModified");
		this.appendFunctionForTable();
	}
	this.typeHead = function() {
		this.fs.string.sort("type");
		this.appendFunctionForTable();
	}
	this.sizeHead = function() {
		this.fs.int.sort("size");
		this.appendFunctionForTable();
	}
	this.share = function() {
		if(this.va["selectedData"].length == 1 && this.va["selectedData"][0].type=="inode/directory") {
			this.fbws.send.share();
			var iconObj = new Icon();
			iconObj.name = "Share";
			iconObj.winInfo.isOnlyOne = true;
			iconObj.contentURL = "/apps/fileBrowser/comps/views/share.jsf";
			gui.configure.manager.execute.app(iconObj);
			taskArray["contextMenu"].disappear();
		}
	}
}
