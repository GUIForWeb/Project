system.elements.desktops.subsystems.selects.DesktopContextMenuSelect = function() {
	this.click = function() {
		if(!event.shiftKey && !event.ctrlKey && !this.select.ctrl.isWorking && !this.select.mousemove.isWorking && !this.select.shift.isWorking && !this.iconContextMenu.isOnTheScreen){
			this.setScriptTag(event.target.parentNode);
			var id = this.tag["s"].prop("id");
			this.isWorking = true;
			var data = this.iconArray[id].json;
			if(data.isChosen){
				data.isChosen= false;
				data.isChangeable= true;
				this.tag["s"].css("background-color", this.hs[false]["background-color"]);
			}
			else {
				data.isChosen= true;
				data.isChangeable= false;
				this.tag["s"].css("background-color", this.hs[true]["background-color"]);
				this.tag["s"].css("opacity", this.hs[true]["opacity"]);
				this.va["selectedIcon"] = this.tag["s"]; 
			}
		}
	}
}