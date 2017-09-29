system.elements.desktops.subsystems.selects.DesktopContextMenuSelect = function() {
	this.click = function() {
		if(!event.shiftKey && !event.ctrlKey && !this.select.ctrl.isWorking && !this.select.mousemove.isWorking && !this.select.shift.isWorking && !this.iconContextMenu.isOnTheScreen){
			this.setScriptTag(event.target);
			if(this.tag["s"].prop("tagName") == "IMG") {
				var name = this.tag["s"].siblings().html();
				for(ji=0; ji<this.manager.jsonArray.length; ji++) {
					var json = this.manager.jsonArray[ji];
					if(json.name == name){
						json.isChosen = true;
						json.isChangeable = false;
						console.log(this.tag["s"].parent());
						this.tag["s"].parent().css("background-color","dimgray");
						this.tag["s"].parent().css("opacity","1");
					}
					else if(json.name != name){
						json.isChosen = false;
						json.isChangeable = true;
					}
				}
			}
		}
	}
}