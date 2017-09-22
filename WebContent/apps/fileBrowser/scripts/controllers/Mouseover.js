fileBrowser.controllers.Mouseover = function() {
	this.row = function(event) {
		this.setCSSTag(event.currentTarget);
		var tmpClass = this.cssTag["s"].attr("class");
		if (tmpClass.includes("dataItem") || tmpClass.includes("parent")) {
			if (!event.ctrlKey && !this.select.drag.isWorking && !this.contextMenu.isOnTheScreen) {
				this.cssTag["s"].css("background-color", "lightgrey");
			}
			else if(event.ctrlKey && this.cssTag["t"].style.getPropertyValue("background-color") == "white") {
				this.cssTag["s"].css("background-color", "lightgrey");
			}
		}
	}
}
