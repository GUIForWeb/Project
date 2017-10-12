system.elements.desktops.controllers.mouses.DesktopMouseover = function() {
	this.icon = function(event){
		this.setCSSTag(event.currentTarget);
		var tmpClass = this.cssTag["s"].attr("class");
		if (tmpClass.includes("iconDiv")) {
			if (!event.shiftKey && !event.ctrlKey && !this.select.ctrl.isWorking && !this.select.mousemove.isWorking && !this.select.shift.isWorking && !this.iconContextMenu.isOnTheScreen) {
				this.cssTag["s"].css("background-color", this.hm[true]["background-color"]);
				this.cssTag["s"].css("opacity", this.hm[true]["opacity"]);
			}
			else if((event.shiftKey || event.ctrlKey) && this.cssTag["t"].style.getPropertyValue("background-color") == "white") {
				this.cssTag["s"].css("background-color", this.hm[true]["background-color"]);
				this.cssTag["s"].css("opacity", this.hm[true]["opacity"]);
			}
		}
	}
	this.li = function(tag) {
		var width = $(tag).width();
		var height = $(tag).height();
		if (tag.childNodes.length > 0) {
			var li = $(tag).find("li");
			li.css("visibility", "visible");
			li.css("height", height);
			li.css("position", "relative");
			li.css("left", width);
			li.css("top", -height);
		}
	}
}