apps.fileBrowser.controllers.drags.FBDragenter = function() {
	this.selection = function(tag, event) {
		$(tag).css("background-color", "dimgray");
		this.__proto__.dCnt++;
	}
}
