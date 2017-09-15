guiLib.controllers.subControllers.Resizeend = function() {
	this.window = function(event) {
		this.gm.resizeend(event.currentTarget);
		this.gr.resizeend(this.va["winAndBarNode"]);
	}
}