system.elements.desktops.controllers.DesktopClick = function() {
	this.rename = function(event) {
		this.setScriptTag(event.target);
		var icon = this.va["selectedIcon"];
		if(icon.prop("class").includes("dataIcon")){
			var nameP = icon.find("p");
			nameP.attr("contenteditable", true);
			nameP.focus();
			//complete rename func
		}
	}
	this.copy = function(event) {
			
	}
	this.cut = function(event) {
		
	}
	this.paste = function(event) {
		
	}
	this.del = function(event) {
		
	}
	this.download = function(event) {
		
	}
	this.button = function(event) {
		if (taskArray["contextMenu"].isOnTheScreen) {
			taskArray["contextMenu"].disappear();
		}
	}
	/*
	this.theme = function(tag) {
		var iconObj = new Icon();
		if (tag.innerHTML == "Icon") {
			iconObj.name = "Icon Theme";
			iconObj.contentURL = "/apps/theme/comps/views/iconTheme.jsf";

		} else if (tag.innerHTML == "Window") {
			iconObj.name = "Window Theme";
			iconObj.contentURL = "/apps/theme/comps/views/windowTheme.jsf";
		} else if (tag.innerHTML == "Background") {
			iconObj.name = "Background Theme";
			iconObj.contentURL = "/apps/theme/comps/views/backgroundTheme.jsf";
		}
		var winObj = this.wme.newWindow(iconObj);
		var barObj = this.bme.newBar(iconObj);
		this.wpe.newPositioning(winObj);
		this.bind.windowAndBar(winObj, barObj);
		this.barListener.call("newBar", barObj);
		this.windowListener.call("newWindow", winObj);
	}
	*/
}