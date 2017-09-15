guiLib.controllers.Controller = function() {
	this.getIconNumId = function(tag) {
		return parseInt(tag.id.replace(this.iconTagIdRule, ""));
	}
	this.getWinNumId = function(tag) {
		return parseInt(tag.id.replace(this.winTagIdRule, ""));
	}
	this.getBarNumId = function(tag) {
		return tag.id.replace(this.barTagIdRule, "");
	}
	this.getIconTdTagId = function(x, y) {
		return this.model.getIconTdTagId(x, y);
	}
}