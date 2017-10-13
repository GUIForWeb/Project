apps.themes.icons.controllers.IconThemeController = function() {
	this.va = [];
	this.va["prevData"] = [];
	this.va["td"] = [];
	this.va["td"]["iconTdWidth"] = gui.iconTdValueArray["iconTdWidth"];
	this.va["td"]["iconTdHeight"] = gui.iconTdValueArray["iconTdHeight"];
	this.va["td"]["iconTdBorderWidth"] = gui.iconTdValueArray["iconTdBorderWidth"];
	this.va["td"]["iconTdBorderHeight"] = gui.iconTdValueArray["iconTdBorderHeight"];
	this.va["td"]["iconTdBorderColor"] = gui.iconTdValueArray["iconTdBorderColor"];
	this.ta = [];
	this.ta["script"] = [];
	this.tag = [];
	this.setScriptTag = function(tag) {
		this.ta["script"]["s"] = $(tag); 
		this.ta["script"]["t"] = tag;
		this.tag["s"] = this.ta["script"]["s"];
		this.tag["t"] = this.ta["script"]["t"];
	}
}