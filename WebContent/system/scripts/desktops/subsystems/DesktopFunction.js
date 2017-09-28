system.desktops.subsystems.DesktopFunction = function() {
	this.rename = function(event) {
		console.log("copy");
		/*
		if (this.va["validation"] && !this.select.mousemove.isWorking) {
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
		*/
	}
	this.copy = function(event) {
		console.log("copy");	
	}
	this.cut = function(event) {
		console.log("cut");
	}
	this.paste = function(event) {
		console.log("paste");
	}
	this.del = function(event) {
		console.log("del");
	}
	this.download = function(event) {
		console.log("download");
	}
}