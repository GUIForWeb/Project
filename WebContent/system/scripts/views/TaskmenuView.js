system.views.TaskmenuView = function(taskmenuModel) {
	this.__proto__ = taskmenuModel;
	this.outerLayerTagClass = "taskMeuOuterLayer";
	this.taskmenuLayer = function() {
		this.taskmenuSelector = this.outerSelector;
	}
	this.outerLayer = function() {
		var tmpTag = $("<div></div>");
		tmpTag.css("z-index", 0);
		tmpTag.addClass(this.outerLayerTagClass);
		tmpTag.width(100);
		tmpTag.height(100);
		tmpTag.offset({
			left : 0,
			top : -tmpTag.height()
		});
		this.outerSelector = tmpTag;
	}
	this.init = function() {
		this.outerLayer();
		this.taskmenuLayer();
	}
}