system.elements.winAndBars.controllers.drags.WinAndBarDragstart = function() {
	this.head = function(event) {
		var winTag = event.currentTarget.parentNode.parentNode;
		var winAndBarNode = this.manager.moveWinToTop(winTag);
		var url = window.location.href.split(this.contextPath)[0];
		url += this.contextPath + winAndBarNode.win.contentURL;
		if (event.originalEvent.dataTransfer !== undefined) {
			event.originalEvent.dataTransfer.setData("text/uri-list", url);
		} else if (event.dataTransfer !== undefined)
			event.dataTransfer.setData("text/uri-list", url);
	}
}