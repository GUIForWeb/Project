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
		this.select.cancle.all();
	}
	this.cut = function(event) {
		taskArray["contextMenu"].disappear();
		taskArray["clipboard"] = true;
		this.socket.sender.cut();
		this.select.cancle.all();
	}
	this.paste = function(event) {
		taskArray["contextMenu"].disappear();
		if(taskArray["clipboard"] && confirm("Paste it?")){
			this.socket.sender.paste();
			taskArray["clipboard"] = false;
		}
	}
	this.del = function(event) {
		if (this.va["validation"] && confirm('Delete it?')) {
			this.socket.sender.del();
			taskArray["contextMenu"].disappear();
			this.va["selectedData"] = [];
		}
	}
	this.download = function(event) {
		if (this.va["validation"] && this.va["selectedData"].length > 0
				&& this.va["selectedData"][0].type != "directory") {
			this.socket.sender.download();
			this.contextMenu.disappear();
		}
	}
	
	this.theme = function(event) {
		var iconObj = new Icon();
		if (event.target.innerHTML == "Icon") {
			iconObj.name = "Icon Theme";
			iconObj.isOnlyOne = true;
			iconObj.contentURL = "/apps/themes/comps/views/iconTheme.jsf";
		} else if (event.target.innerHTML == "Interface") {
			iconObj.name = "Interface Theme";
			iconObj.isOnlyOne = true;
			iconObj.contentURL = "/apps/themes/comps/views/interfaceTheme.jsf";
		} else if (event.target.innerHTML == "Background") {
			iconObj.name = "Background Theme";
			iconObj.isOnlyOne = true;
			iconObj.contentURL = "/apps/themes/comps/views/backgroundTheme.jsf";
		}
		this.configure.manager.execute.app(iconObj);
		taskArray["contextMenu"].disappear();
	}
}