system.views.TaskmenuView = function(taskmenuModel) {
	this.__proto__ = taskmenuModel;
	this.liHeight = 30;
	this.outerLayerTagClass = "taskmenuOuterLayer";
	this.menuLayerTagClass = "taskmenuLayer";
	this.taskmenuLayer = function() {
		this.taskmenuSelector = this.outerSelector;
	}
	
	this.outerLayer = function() {
		var outerTag = $("<div></div>");
		var menuTag = $("<div></div>");
		var ulTag = $("<ul></ul>");
		this.piTag = $("<li>Personal Info</li>");
		menuTag.addClass(this.menuLayerTagClass);
		outerTag.addClass(this.outerLayerTagClass);
		ulTag.append(this.piTag);
		menuTag.append(ulTag)
		outerTag.append(menuTag);
		outerTag.height(this.liHeight)
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
	}
	this.init = function() {
		this.outerLayer();
		this.taskmenuLayer();
	}
	this.append = function(selector) {
		this.outerSelector.append(selector);
	}
}