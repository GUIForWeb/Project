system.views.TaskmenuView = function(taskmenuModel) {
	this.__proto__ = taskmenuModel;
	this.liHeight = 30;
	this.fontSize = "100%";
	this.outerLayerTagClass = "taskmenuOuterLayer";
	this.menuLayerTagClass = "taskmenuLayer";
	this.taskmenuLayer = function() {
		this.taskmenuSelector = this.outerSelector;
	}
	this.setZIndex = function(zIndex) {
		this.outerSelector.css("zIndex",zIndex);
	}
	this.outerLayer = function() {
		if(gui.isMobile)
			this.liHeight *= 3;
		var outerTag = $("<div></div>");
		var menuTag = $("<div></div>");
		var ulTag = $("<ul></ul>");
		this.piTag = $("<li>Password</li>");
		this.logoutTag = $("<li>Logout</li>");
		menuTag.addClass(this.menuLayerTagClass);
		outerTag.addClass(this.outerLayerTagClass);
		ulTag.append(this.piTag);
		ulTag.append(this.logoutTag);
		menuTag.append(ulTag)
		outerTag.append(menuTag);
		outerTag.height(this.liHeight * outerTag.find("li").length);
		outerTag.offset({
			left : 0,
			top : -outerTag.height()
		});
		
		this.outerSelector = outerTag;
	}
	this.initEvent = function() {
		this.piTag.click(function(){
			gui.taskbar.click.personalInfoBt();
		});
		this.logoutTag.click(function(){
			gui.taskbar.click.logout();
		});
	}
	this.init = function() {
		this.outerLayer();
		this.taskmenuLayer();
	}
	this.append = function(selector) {
		this.outerSelector.append(selector);
	}
}