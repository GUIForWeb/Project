guiLib.views.BackgroundView = function(background) {
	this.__proto__ = background;
	this.zIndex = 0;
	this.guiHeight = $(document).height();
	this.tagClass = "background";
	this.iconTableTagClass = "iconTable";
	this.iconTrTagClass = "iconTr";
	this.iconTdTagClass = "iconTd";
	this.background = function() {
		var tmpTag = $("<div></div>");
		tmpTag.css("z-index", this.zIndex);
		tmpTag.addClass(this.tagClass);
		tmpTag.contextmenu(function() {
			gui.contextmenu.background(event);
		});
		tmpTag.click(function() {
			gui.click.eButton(event);
		});
		this.backgroundSelector = tmpTag;
	}
	this.table = function() {
		var tmpTag = $("<table></table>");
		tmpTag.addClass(this.iconTableTagClass);
		this.tableSelector = tmpTag;
	}
	this.tr = function() {
		var tmpTag = $("<tr></tr>");
		tmpTag.addClass(this.iconTrTagClass);
		return tmpTag;
	}
	this.td = function(x, y) {
		var tmpTag = $("<td></td>");
		tmpTag.attr("id", this.getIconTdTagId(x, y));
		tmpTag.addClass(this.iconTdTagClass);
		tmpTag.on("drop",function(event){
			gui.drop.icon(event);
		});
		tmpTag.on("dragover",function(event){
			gui.drag.over.icon();
		});
		return tmpTag;
	}
	this.getView = function() {
		this.background();
		this.table();
	}
}