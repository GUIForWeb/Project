system.elements.desktops.subsystems.selects.DesktopContextMenuSelect = function() {
	this.click = function() {
		if(!event.shiftKey && !event.ctrlKey && !this.select.ctrl.isWorking && !this.select.mousemove.isWorking && !this.select.shift.isWorking && !this.iconContextMenu.isOnTheScreen){
			this.setScriptTag(event.target.parentNode);
			if(this.tag["s"].prop("class").includes("dataIcon")) {
				var id = this.tag["s"].prop("id");
				this.isWorking = true;
				var data = this.iconArray[id].json;
				if(data.isChosen){
					data.isChosen= false;
					data.isChangeable= true;
					this.tag["s"].css("background-color", "white");
				}
				else {
					data.isChosen= true;
					data.isChangeable= false;
					this.tag["s"].css("background-color", "dimgray");
					this.tag["s"].css("opacity", "1");
					this.va["selectedIcon"] = this.tag["s"]; 
				}
			}
		}
	}
}