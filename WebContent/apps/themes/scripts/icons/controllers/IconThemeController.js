apps.themes.icons.controllers.IconThemeController = function() {
	this.va = [];
	this.va["prevData"] = [];
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