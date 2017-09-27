system.controllers.Controller = function() {
	this.getIconNumId = function(tag) {
		var icon = new Icon();
		return parseInt(tag.id.replace(icon.tagIdRule, ""));
	}
	this.getDataIconNumId = function(tag) {
		var dataIcon = new DataIcon();
		return parseInt(tag.id.replace(dataIcon.tagIdRule, ""));
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
	this.getIconTdXY = function(tag){
		var xy = tag.id.replace("iconTdX","");
		xy = xy.split("Y");
		return {"x":parseInt(xy[0]),"y":parseInt(xy[1])};
	}
}