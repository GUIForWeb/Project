system.controllers.Dblclick = function() {
	this.icon = function(event) {
		var id = event.currentTarget.id;
		console.log(id);
		var iconObj = this.iconArray[id];
		var winAndBarNode = this.gm.newWinAndBar(iconObj);
		this.gr.newWinAndBar(winAndBarNode);
	}
}
