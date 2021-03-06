system.views.BackgroundView = function(background) {
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
			gui.desktop.contextmenu.background(event);
		});
		tmpTag.mousedown(function() {
			gui.desktop.mouse.down.button(event);
		});
		tmpTag.bind("mousedown",function() {
			gui.desktop.mouse.down.selection(event);
		});
		tmpTag.mouseup(function() {
			gui.desktop.mouse.up.background(event);
		});
		tmpTag.bind("mouseup",function() {
			gui.desktop.mouse.up.selection(event);
		});
		tmpTag.mousemove(function() {
			gui.desktop.mouse.move.selection(event);
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
		tmpTag.on("dragover",function(event){
			gui.desktop.drag.over.icon();
		});
		tmpTag.on("drop",function(event){
			gui.desktop.drag.drop.icon(event);
		});
		return tmpTag;
	}
	this.init = function() {
		this.background();
		this.table();
	}
}