system.elements.desktops.controllers.DesktopClick = function() {
	this.rename = function(event) {
		taskArray["contextMenu"].disappear();
		this.setScriptTag(event.target);
		var icon = this.va["selectedIcon"];
		if(icon.prop("class").includes("dataIcon")){
			var nameP = icon.find("p");
			nameP.attr("contenteditable", true);
			nameP.focusout(function(event) {
				gui.desktop.focus.out.rename(event);
			});
			nameP.keydown(function(event) {
				gui.desktop.key.down.rename(event);
			});
			nameP.focus();
			this.va["prevData"] = this.va["selectedData"];
		}
	}
	this.copy = function(event) {
		taskArray["contextMenu"].disappear();
		taskArray["clipboard"] = true;
		this.socket.sender.copy();
	}
	this.cut = function(event) {
		taskArray["contextMenu"].disappear();
		taskArray["clipboard"] = true;
		this.socket.sender.cut();
	}
	this.paste = function(event) {
		taskArray["contextMenu"].disappear();
		if(taskArray["clipboard"] && confirm("Paste it?")){
			this.socket.sender.paste();
			taskArray["clipboard"] = false;
		}
	}
	this.del = function(event) {
		
	}
	this.download = function(event) {
		
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