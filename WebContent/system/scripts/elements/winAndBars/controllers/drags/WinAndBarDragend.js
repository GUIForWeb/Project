system.elements.winAndBars.controllers.drags.WinAndBarDragend = function() {
	this.head = function(event) {
		var winTag = event.currentTarget.parentNode.parentNode;
		var tmpNode = this.manager.nm.getNodeWithWinTag(winTag);
		this.manager.pe.changePosition(tmpNode);
		this.repo.changePosition(tmpNode);
	}
}