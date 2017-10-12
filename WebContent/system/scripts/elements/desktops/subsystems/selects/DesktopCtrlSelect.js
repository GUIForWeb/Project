system.elements.desktops.subsystems.selects.DesktopCtrlSelect = function() {
	this.isWorking = false;
	this.cancle = function(){
		this.select.ctrl.isWorking = false;
	}
	this.icon = function(event) {
		this.setScriptTag(event.target.parentNode);
		if (this.tag["s"].prop("class").includes("iconDiv")) {
			var id = this.tag["s"].attr("id");
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