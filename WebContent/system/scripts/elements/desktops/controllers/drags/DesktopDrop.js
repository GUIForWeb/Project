system.elements.desktops.controllers.drags.DesktopDrop = function() {
	this.icon = function(event) {
		var tmpText = event.originalEvent.dataTransfer.getData("icon");
		var tmpFBId = event.originalEvent.dataTransfer.getData("dataItem");
		tmpText = tmpText.substring(0,4);
		if(!tmpFBId == "" && confirm("Paste it?")){
			taskArray.fileBrowser[tmpFBId].fbws.send.pasteToDesktop();
		}else if(tmpText == "icon" || tmpText == "data") {
			var newTd = this.getIconTdXY(event.currentTarget);
			var tagId = event.originalEvent.dataTransfer.getData("icon")
			var icon = this.iconArray[tagId];
			if(this.iconCoordinate[newTd.x+","+newTd.y] === undefined){
				var json = {
						"id" : icon.id,
						"x" : newTd.x,
						"y" : newTd.y
				};
				delete this.iconCoordinate[icon.x+","+icon.y];
				this.iconCoordinate[newTd.x+","+newTd.y] = true;
				icon.disappear();
				icon.x = newTd.x;
				icon.y = newTd.y;
				icon.appear();
				if(tmpText == "icon")
					this.socket.sender.iconXY(json);
				if(tmpText == "data")
					this.socket.sender.dataIconXY(json);
			}
		}
	}
}