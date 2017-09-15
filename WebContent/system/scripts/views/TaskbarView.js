guiLib.views.TaskbarView = function(BarModel) {
	this.__proto__ = BarModel;
	this.outerLayerTagClass = "taskbarOuterLayer";
	this.logoutouterTagClass = "logoutOuterLayer";
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
		tmpTag.css("position", "absolute");
		tmpTag.css("background-color", "darkgray");
		tmpTag.css("font-size", this.oHeight - 10);
		tmpTag.css("text-align", "center");
		tmpTag.css("display", "flex");
		tmpTag.css("align-items", "center");
		tmpTag.addClass(this.logoutTagClass);
		tmpTag.width(this.oHeight - 2);
		tmpTag.height(this.oHeight - 2);
		tmpTag.offset({
			left : this.oWidth - (this.oHeight - 2),
			top : 2
		});
		this.logoutouterSelector = tmpTag;
	}
	this.setTaskbarValues = function(taskbarValueArray) {
		this.taskbarMode = taskbarValueArray["taskbarMode"];
		this.taskbarWidth = taskbarValueArray["taskbarWidth"];
		this.taskbarHeight = taskbarValueArray["taskbarHeight"];
		if (this.taskbarWidth == -1)
			this.oWidth = $(window).width();
		else
			this.oWidth = this.taskbarWidth;

		if (this.taskbarHeight == -1)
			this.oHeight = $(window).height();
		else
			this.oHeight = this.taskbarHeight;

		if (this.taskbarMode == "horizontal") {
			this.oLeft = 0;
			this.oTop = $(window).height() - this.oHeight;
		} else if (taskbarMode == "vertical") {
			this.oLeft = $(window).width() - this.oWidth;
			this.oTop = 0;
		}
	}
	this.getView = function() {
		this.logoutLayer();
		this.logoutOuterLayer();
		this.outerLayer();
		this.taskbarLayer();
	}
}