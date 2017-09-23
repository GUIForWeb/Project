fileBrowser.controllers.mouse.Mouseout = function() {
	this.row = function(event) {
		var tmpClass = this.cssTag["s"].attr("class");
		if (tmpClass.includes("dataItem") || tmpClass.includes("parent")) {
			if (!event.ctrlKey && !this.select.mousemove.isWorking && !this.contextMenu.isOnTheScreen) {
				this.cssTag["s"].css("background-color", "white");
			}
			else if(event.ctrlKey && this.cssTag["t"].style.getPropertyValue("background-color") == "lightgrey") {
				this.cssTag["s"].css("background-color", "white");
			}
		}
	}
}
