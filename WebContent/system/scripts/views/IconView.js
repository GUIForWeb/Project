guiLib.views.IconView = function(icon) {
	this.__proto__ = icon;
	this.zIndex = 0;
	this.outerLayer = "";
	this.iconTdBorderWidth = 0;
	this.iconTdBorderHeight = 0;
	this.iconLayer = function() {
		this.iconSelector = this.outerSelector;
	}
	this.outerLayer = function() {
		var tmpTag = $("<div></div>");
		tmpTag = tmpTag.attr("id", this.tagId);
		tmpTag.css("z-index", this.zIndex);
		tmpTag.addClass(this.tagClass);
		tmpTag.attr("dragable", "true");
		tmpTag.on("drag", function(event) {
			gui.drag.ing.icon(event);
		});
		
		tmpTag.on("dragstart", function(event) {
			gui.drag.start.icon(event);
		});
		
		tmpTag.dblclick(function(event) {
			gui.dblclick.icon(event);
		});

		var tmpImg = $("<img>").attr("src", this.contextPath + this.iconURL);
		tmpImg.addClass("iconImg");
		tmpTag.prepend(tmpImg)
		this.outerSelector = tmpTag;
	}
	this.getView = function() {
		this.outerLayer();
		this.iconLayer();
	}
}