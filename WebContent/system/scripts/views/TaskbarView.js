system.views.TaskbarView = function(BarModel) {
	this.__proto__ = BarModel;
	this.outerLayerTagClass = "taskbarOuterLayer";
	this.logoutOuterTagClass = "logoutOuterLayer";
	this.oBorderWidth = 5;
	this.taskbarLayer = function() {
		this.logoutouterSelector.append(this.logoutSelector);
		this.outerSelector.append(this.logoutouterSelector);
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
	this.logoutLayer = function() {
		var tmpTag = $("<div>&odash;</div>");
		tmpTag.css("flex", "1");
		tmpTag.attr("onclick", "location.href='" + this.contextPath
				+ "/system/comps/views/logout.jsf'");
		this.logoutSelector = tmpTag;
	}
	this.logoutOuterLayer = function() {
		var tmpTag = $("<div></div>");
		tmpTag.addClass(this.logoutOuterTagClass);
		tmpTag.css("position", "absolute");
		tmpTag.css("background-color", "darkgray");
		tmpTag.css("font-size", this.oHeight - 10);
		tmpTag.css("text-align", "center");
		tmpTag.css("display", "flex");
		tmpTag.css("align-items", "center");
		tmpTag.width(this.oHeight - 2);
		tmpTag.height(this.oHeight - 2);
		tmpTag.offset({
			left : this.oWidth - (this.oHeight - 2),
			top : 2
		});
		this.logoutouterSelector = tmpTag;
	}
	this.setTaskbarValues = function(taskbarValueArray) {
		this.taskbarOHeight = taskbarValueArray["taskbarOHeight"];
		this.oWidth = $(window).width();
		this.oHeight = this.taskbarOHeight + this.oBorderWidth*2;
		this.oLeft = 0;
		this.oTop = $(window).height() - this.oHeight;
	}
	this.getView = function() {
		this.logoutLayer();
		this.logoutOuterLayer();
		this.outerLayer();
		this.taskbarLayer();
	}
}