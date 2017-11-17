system.views.TaskbarView = function(BarModel) {
	this.__proto__ = BarModel;
	this.outerLayerTagClass = "taskbarOuterLayer";
	this.barZoneOuterTagClass = "barZoneOuterLayer";
	this.menuBtOuterTagClass = "menuBtOuterLayer";
	this.logoutBtOuterTagClass = "logoutBtOuterLayer";
	this.oBorderWidth = 5;
	this.taskbarLayer = function() {
		this.menuBtOuterSelector.append(this.menuBtSelector);
		this.logoutBtOuterSelector.append(this.logoutSelector);
		this.barZoneOuterSelector.append(this.barZoneSelector);
		this.outerSelector.append(this.barZoneOuterSelector);
		this.outerSelector.append(this.menuBtOuterSelector);
		this.outerSelector.append(this.logoutBtOuterSelector);
		this.taskbarSelector = this.outerSelector;
	}
	this.outerLayer = function() {
		var tmpTag = $("<div></div>");
		tmpTag.attr("id", this.tagId);
		tmpTag.css("z-index", 0);
		tmpTag.css("position", "absolute");
		tmpTag.addClass(this.outerLayerTagClass);
		tmpTag.width(this.oWidth);
		tmpTag.height(this.oHeight);
		tmpTag.offset({
			left : this.oLeft,
			top : this.oTop
		});
		this.outerSelector = tmpTag;
	}
	this.barZoneOuterLayer = function() {
		var tmpTag = $("<div></div>");
		tmpTag.addClass(this.barZoneOuterTagClass);
		tmpTag.width(this.oWidth - (this.oHeight - 2)*2);
		tmpTag.height(this.oHeight);
		tmpTag.offset({
			left : this.oHeight - 2,
			top : 0
		});
		this.barZoneOuterSelector = tmpTag;
	}
	this.barZoneLayer = function() {
		var tmpTag = $("<div></div>");
		tmpTag.width(0);
		tmpTag.height(this.oHeight);
		this.barZoneSelector = tmpTag;
	}
	this.menuBtLayer = function() {
		var tmpTag = $("<div>&Assign;</div>");
		tmpTag.css("flex", "1");
		tmpTag.click(function(){
			gui.taskbar.click.menuBt();
		});
		this.menuBtSelector = tmpTag;
	}
	this.menuBtOuterLayer = function() {
		var tmpTag = $("<div></div>");
		tmpTag.addClass(this.menuBtOuterTagClass);
		tmpTag.css("font-size", this.oHeight - 10);
		tmpTag.width(this.oHeight - 2);
		tmpTag.height(this.oHeight - 2);
		tmpTag.offset({
			left : 0,
			top : 2
		});
		this.menuBtOuterSelector = tmpTag;
	}
	this.logoutLayer = function() {
		var tmpTag = $("<div>&bigotimes;</div>");
		tmpTag.css("flex", "1");
		tmpTag.attr("onclick", "location.href='" + this.contextPath
				+ "/system/comps/views/logout.jsf'");
		this.logoutSelector = tmpTag;
	}
	this.logoutBtOuterLayer = function() {
		var tmpTag = $("<div></div>");
		tmpTag.addClass(this.logoutBtOuterTagClass);
		tmpTag.css("font-size", this.oHeight - 10);
		tmpTag.width(this.oHeight - 2);
		tmpTag.height(this.oHeight - 2);
		tmpTag.offset({
			left : this.oWidth - (this.oHeight - 2),
			top : 2
		});
		this.logoutBtOuterSelector = tmpTag;
	}
	this.setTaskbarValues = function(taskbarValueArray) {
		this.taskbarOHeight = taskbarValueArray["taskbarOHeight"];
		this.oWidth = $(window).width();
		this.oHeight = this.taskbarOHeight + this.oBorderWidth*2;
		this.oLeft = 0;
		this.oTop = $(window).height() - this.oHeight;
	}
	this.init = function() {
		this.barZoneOuterLayer();
		this.barZoneLayer();
		this.menuBtLayer();
		this.menuBtOuterLayer();
		this.logoutLayer();
		this.logoutBtOuterLayer();
		this.outerLayer();
		this.taskbarLayer();
	}
}