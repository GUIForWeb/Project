system.views.DataIconView = function(icon) {
	this.__proto__ = icon;
	this.zIndex = 0;
	this.outerLayer = "";
	this.tagClass = "iconDiv";
	this.imgClass = "iconImg";
	this.nameClass = "nameP";
	this.iconTdBorderWidth = 0;
	this.iconTdBorderHeight = 0;
	this.iconLayer = function() {
		this.iconSelector = this.outerSelector;
	}
	this.outerLayer = function() {
		var outerSelector = $("<div></div>");
		outerSelector.attr("id", this.tagId);
		outerSelector.css("z-index", this.zIndex);
		outerSelector.addClass(this.tagClass);
		outerSelector.attr("dragable", "true");
		outerSelector.on("drag", function(event) {
			gui.winAndBar.drag.ing.icon(event);
		});
		outerSelector.on("dragstart", function(event) {
			gui.winAndBar.drag.start.icon(event);
		});
		outerSelector.dblclick(function(event) {
			gui.winAndBar.dblclick.icon(event);
		});
		outerSelector.contextmenu(function(event) {
			event.stopPropagation();
			gui.winAndBar.contextmenu.icon(event);
		});
		outerSelector.mouseover(function(event) {
			gui.desktop.mouse.over.icon(event);
		});
		outerSelector.mouseout(function(event) {
			gui.desktop.mouse.out.icon(event);
		});
		var imgSelector = $("<img>").attr("src", this.contextPath + this.imgURL);
		imgSelector.attr("title",this.name);
		imgSelector.addClass(this.imgClass);
		var nameSelector = $("<p></p>").html(this.name);
		nameSelector.addClass(this.nameClass);
		outerSelector.prepend(imgSelector);
		outerSelector.append(nameSelector);
		this.outerSelector = outerSelector;
	}
	this.getView = function() {
		this.outerLayer();
		this.iconLayer();
	}
}