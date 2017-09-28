system.winsAndBars.controllers.drags.Dragend = function() {
	this.icon = function(event) {
	}
	this.head = function(event) {
		var winTag = event.currentTarget.parentNode.parentNode;
		var tmpNode = this.nm.getNodeWithWinTag(winTag);
		this.pe.changePosition(tmpNode);
		this.gr.changePosition(tmpNode);
	}
}