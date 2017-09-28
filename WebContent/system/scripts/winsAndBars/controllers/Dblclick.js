system.winsAndBars.controllers.Dblclick = function() {
	this.icon = function(event) {
		var id = event.currentTarget.id;
		var iconObj = this.iconArray[id];
		this.am.run(iconObj);
	}
}
