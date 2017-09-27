system.controllers.Drop = function() {
	this.icon = function(event) {
		var tmpText = event.originalEvent.dataTransfer.getData("text");
		tmpText = tmpText.substring(0,4);
		if(tmpText == "icon" || tmpText == "data") {
			var newTd = this.getIconTdXY(event.currentTarget);
			var tagId = event.originalEvent.dataTransfer.getData("text")
			var icon = this.iconArray[tagId];
			if(this.iconCoordinate[newTd.x+","+newTd.y] === undefined){
				var json = {
						"id" : icon.id,
						"x" : newTd.x,
						"y" : newTd.y
				};
				delete this.iconCoordinate[icon.x+","+icon.y];
				this.iconCoordinate[newTd.x+","+newTd.y] = true;
				icon.x = newTd.x;
				icon.y = newTd.y;
				icon.appear();
				if(tmpText == "icon")
					this.dm.iconXY(json);
				if(tmpText == "data")
					this.dm.dataIconXY(json);
			}
		}
	}
}