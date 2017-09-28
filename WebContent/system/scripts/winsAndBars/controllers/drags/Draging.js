system.winsAndBars.controllers.drags.Draging = function() {
	this.head = function(event) {
		this.pe.outerLayer(event.currentTarget.parentNode.parentNode);
	}
	this.icon = function(event) {
		//this.pe.outerLayer(event.currentTarget);
	}
}