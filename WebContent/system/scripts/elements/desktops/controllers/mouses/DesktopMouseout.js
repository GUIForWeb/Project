system.elements.desktops.controllers.mouses.DesktopMouseout = function() {
	this.icon = function(){
		var tmpClass = this.cssTag["s"].attr("class");
		if (tmpClass.includes("iconDiv")) {
			if (!event.shiftKey && !event.ctrlKey && !this.select.ctrl.isWorking && !this.select.mousemove.isWorking && !this.select.shift.isWorking && !this.iconContextMenu.isOnTheScreen) {
				//this.select.cancle.row(this.cssTag["s"]);
				this.cssTag["s"].css("background-color", this.hm[false]["background-color"]);
				this.cssTag["s"].css("opacity", this.hm[false]["opacity"]);
			}
			else if((event.ctrlKey || event.shiftKey) && this.cssTag["t"].style.getPropertyValue("background-color") == "skyblue") {
				this.cssTag["s"].css("background-color", this.hm[false]["background-color"]);
				this.cssTag["s"].css("opacity", this.hm[false]["opacity"]);
			}
		}
	}
	this.li = function(tag) {
		var width = $(tag).width();
		var bgC = $(tag).css("background-color");
		var top = $(tag).offset().top;
		if (tag.childNodes.length > 0) {
			var li = $(tag).find("li");
			li.css("visibility", "hidden");
		}
	}
}