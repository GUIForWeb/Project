system.views.DataIconView = function(icon) {
	this.__proto__ = icon;
	this.zIndex = 0;
	this.outerLayer = "";
	this.tagClass = "iconDiv";
	this.imgClass = "iconImg";
	this.nameClass = "nameP";
	this.width = 0;
	this.height = 0;
	this.iconLayer = function() {
		this.iconSelector = this.outerSelector;
	}
	this.outerLayer = function() {
		var outerSelector = $("<div></div>");
		outerSelector.attr("id", this.tagId);
		outerSelector.css("z-index", this.zIndex);
		outerSelector.css("width", this.width);
		outerSelector.css("height", this.height);
		outerSelector.addClass(this.tagClass);
		outerSelector.attr("dragable", "true");
		outerSelector.on("drag", function(event) {
			gui.desktop.drag.ing.icon(event);
		});
		outerSelector.on("dragstart", function(event) {
			gui.desktop.drag.start.icon(event);
		});
		outerSelector.dblclick(function(event) {
			gui.desktop.dblclick.icon(event);
		});
		outerSelector.contextmenu(function(event) {
			gui.desktop.contextmenu.icon(event);
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
		imgSelector.css("width", this.width);
		imgSelector.css("height", this.height);
		this.nameSelector = $("<p></p>").html(this.name);
		this.nameSelector.addClass(this.nameClass);
		outerSelector.prepend(imgSelector);
		outerSelector.append(this.nameSelector);
		this.outerSelector = outerSelector;
	}
	this.init = function() {
		this.outerLayer();
		this.iconLayer();
	}
}