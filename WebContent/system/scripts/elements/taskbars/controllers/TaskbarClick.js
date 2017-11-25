system.elements.taskbars.controllers.TaskbarClick = function() {
	this.rightKey = function(event) {
		var bzoLeft = this.barZoneOuterSelector.offset().left;
		var bzoWidth = this.barZoneOuterSelector.width();
		var bzWidth = this.barZoneSelector.width();
		var bzLeft = this.barZoneSelector.offset().left;
		if(bzWidth+(bzLeft-bzoLeft)>bzoWidth)
		this.barZoneSelector.offset(
			{left: bzLeft - barDefaultValueArray.oWidth}
		);
	}
	this.leftKey = function(event) {
		var bzoLeft = this.barZoneOuterSelector.offset().left;
		var bzLeft = this.barZoneSelector.offset().left;
		if(bzLeft < bzoLeft)
		this.barZoneSelector.offset(
			{left: bzLeft + barDefaultValueArray.oWidth}
		);
	}
	this.menuBt = function(event) {
		if(!this.manager.menu.isDisplayed)
			this.manager.menu.appear();
		else
			this.manager.menu.disappear();
	}
	this.personalInfoBt = function() {
		var iconObj = new Icon();
		iconObj.name = "Personal Info";
		iconObj.isOnlyOne = true;
		iconObj.winInfo.isResizable = false;
		iconObj.winInfo.oWidth = 400;
		iconObj.winInfo.oHeight = 260;
		iconObj.contentURL = "/system/comps/views/passwordChange.jsf";
		this.configure.manager.execute.app(iconObj);
		this.manager.menu.disappear();
	}
	this.logout = function() {
		location.href= this.contextPath + "/system/comps/views/logout.jsf";
	}
	this.hideBt = function() {
		if(!gui.winAndBar.manager.isAllDisappeared)
			gui.winAndBar.manager.disappearAll();
	} 
}