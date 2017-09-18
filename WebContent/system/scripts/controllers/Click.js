guiLib.controllers.Click = function() {
	this.xButton = function(event) {
		var winTag = event.currentTarget.parentNode.parentNode;
		var winAndBarNode = this.gm.xWinAndBar(winTag);
		this.gr.xWinAndBar(winAndBarNode);
	}
	this.cButton = function(event) {
		var winTag = event.currentTarget.parentNode;
		var zIndex = winTag.style.zIndex;
		this.gm.moveWinToTop(winTag);
		this.gr.moveWinToTop(zIndex);
	}
	this.hButton = function(event) {
		var winTag = event.currentTarget.parentNode.parentNode;
		var zIndex = winTag.style.zIndex
		this.gm.disappear(winTag);
		this.gr.disappear(zIndex);
	}
	this.bar = function(event) {
		var barTag = event.currentTarget.parentNode;
		var winTagId = this.winTagIdRule + this.getBarNumId(barTag);
		var winTag = $("#" + winTagId)[0];
		if (winTag) {
			var zIndex = winTag.style.zIndex;
			this.gm.disappear(winTag);
			this.gr.disappear(zIndex);
		} else {
			this.gm.appear(barTag);
			this.gr.appear(this.getBarNumId(barTag));
		}
	}
	this.head = function(event) {
		event.stopPropagation();
		var winTag = event.currentTarget.parentNode.parentNode;
		var zIndex = winTag.style.zIndex;
		this.gm.moveWinToTop(winTag);
		this.gr.moveWinToTop(zIndex);
	}
	this.content = function(event) {
		var winTag = event.currentTarget.parentNode;
		var zIndex = winTag.style.zIndex;
		this.gm.moveWinToTop(winTag);
		this.gr.moveWinToTop(zIndex);
	}
	this.eButton = function(tag) {
		if (this.bgContextMenu.isOnTheScreen) {
			this.bgContextMenu.remove();
			this.bgContextMenu.isOnTheScreen = false;
		}
	}

	this.fButton = function(event) {
		var winTag = event.currentTarget.parentNode.parentNode;
		var winAndBarNode = this.gm.fullScreen(winTag);
		this.gr.fullScreen(winAndBarNode);
	}

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
}