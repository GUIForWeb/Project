system.views.TaskmenuView = function(taskMenuModel) {
	this.__proto__ = taskMenuModel;
	this.outerLayerTagClass = "taskMeuOuterLayer";
	this.taskManuLayer = function() {
		this.taskMenuSelector = this.outerSelector;
	}
	this.outerLayer = function() {
		var tmpTag = $("<div></div>");
		tmpTag.css("z-index", 0);
		tmpTag.addClass(this.outerLayerTagClass);
		tmpTag.width(100);
		tmpTag.height(100);
		tmpTag.offset({
			left : 0,
			top : 0
		});
		this.outerSelector = tmpTag;
	}
}