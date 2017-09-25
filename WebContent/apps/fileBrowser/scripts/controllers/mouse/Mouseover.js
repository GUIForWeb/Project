fileBrowser.controllers.mouse.Mouseover = function() {
	this.row = function(event) {
		this.setCSSTag(event.currentTarget);
		var tmpClass = this.cssTag["s"].attr("class");
		if (tmpClass.includes("dataItem") || tmpClass.includes("parent")) {
			if (!event.shiftKey && !event.ctrlKey && !this.select.ctrl.isWorking && !this.select.mousemove.isWorking && !this.select.shift.isWorking && !this.contextMenu.isOnTheScreen) {
				this.cssTag["s"].css("background-color", "lightgrey");
			}
			else if((event.shiftKey || event.ctrlKey) && this.cssTag["t"].style.getPropertyValue("background-color") == "white") {
				this.cssTag["s"].css("background-color", "lightgrey");
			}
		}
	}
}
