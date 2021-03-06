apps.fileBrowser.controllers.mouses.FBMouseout = function() {
	this.row = function(event) {
		var tmpClass = this.cssTag["s"].attr("class");
		if (tmpClass.includes("dataItem") || tmpClass.includes("parent")) {
			if (!event.shiftKey && !event.ctrlKey && !this.select.ctrl.isWorking && !this.select.mousemove.isWorking && !this.select.shift.isWorking && !this.contextMenu.isOnTheScreen) {
				this.select.cancle.row(this.cssTag["s"]);
				this.cssTag["s"].css("background-color", "white");
			}
			else if((event.ctrlKey || event.shiftKey) && this.cssTag["t"].style.getPropertyValue("background-color") == "lightgrey") {
				this.cssTag["s"].css("background-color", "white");
			}
		}
	}
	this.selection = function(event) {
		var len = !this.fbTable.children().find($(event.toElement)).length;
		var elm = event.toElement;
		if(elm != $("#selection")[0] && elm != this.section[0] && elm != this.fbTable[0] && len){
			if(this.select.mousemove.isOnGoing){
				this.select.mousemove.end(event);
			}
		}
	}
}
