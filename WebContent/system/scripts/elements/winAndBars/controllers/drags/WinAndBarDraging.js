system.elements.winAndBars.controllers.drags.WinAndBarDraging = function() {
	this.head = function(event) {
		this.manager.pe.outerLayer(event.currentTarget.parentNode.parentNode);
	}
}