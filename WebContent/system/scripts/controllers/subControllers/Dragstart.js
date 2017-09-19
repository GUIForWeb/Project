guiLib.controllers.subControllers.Dragstart = function() {
	this.head = function(event) {
		var winTag = event.currentTarget.parentNode.parentNode;
		var winAndBarNode = this.gm.moveWinToTop(winTag);
		var url = window.location.href.split(this.contextPath)[0];
		url += this.contextPath + winAndBarNode.win.contentURL;
		if (event.originalEvent.dataTransfer !== undefined) {
			event.originalEvent.dataTransfer.setData("text/uri-list", url);
		} else if (event.dataTransfer !== undefined)
			event.dataTransfer.setData("text/uri-list", url);
	}
	this.icon = function(event) {
		event.originalEvent.dataTransfer.setData("text", event.currentTarget.id);
	}
}