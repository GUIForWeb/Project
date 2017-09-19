guiLib.controllers.Drop = function() {
	this.icon = function(event) {
		console.log("drop");
		var newTd = this.getIconTdXY(event.currentTarget);
		var tagId = event.originalEvent.dataTransfer.getData("text")
		var icon = $("#"+tagId);
		var id = this.getIconNumId(icon[0])
		var iconJSON = this.iconJSONArray[this.getIconNumId(icon[0])];
		if(this.iconCoordinate[newTd.x+","+newTd.y] === undefined){
			$(event.currentTarget).append(icon);
			var json = {
					"id" : id,
					"x" : newTd.x,
					"y" : newTd.y
			};
			delete this.iconCoordinate[iconJSON.x+","+iconJSON.y];
			iconJSON.x = newTd.x
			iconJSON.y = newTd.y
			this.im.iconXY(json);
		}
	}
}