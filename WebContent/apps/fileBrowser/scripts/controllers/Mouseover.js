fileBrowser.controllers.Mouseover = function() {
	this.row = function(event) {
		if (!this.select.drag.isWorking && !this.select.ctrl.isWorking && !this.contextMenu.isOnTheScreen) {
			this.setCSSTag(event.currentTarget);
			var tmpClass = this.cssTag["s"].attr("class");
			if (tmpClass.includes("dataItem") || tmpClass.includes("parent")) {
				this.cssTag["s"].css("background-color", "lightgrey");
			}
		}
	}
}
