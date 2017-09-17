fileBrowser.controllers.Mouseout = function() {
	this.row = function(event) {
		if (!this.ds.isWorking && !this.cs.isWorking && !this.contextMenu.isOnTheScreen) {
			var tmpClass = this.cssTag["s"].attr("class");
			if (tmpClass.includes("fileItem") || tmpClass.includes("parent")) {
				this.cssTag["s"].css("background-color", "white");
			}
		}
	}
}
