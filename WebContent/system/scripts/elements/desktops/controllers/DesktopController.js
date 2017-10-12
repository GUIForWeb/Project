system.elements.desktops.controllers.DesktopController = function() {
	// valueArray
	this.va = [];
	this.va["validation"] = false;
	this.va["dropable"] = false;
	this.va["selectedData"] = [];
	this.va["path"] = "";
	this.va["data"] = [];
	this.va["dataDrag"] = false;
	//hover
	this.va["hover"] = [];
	this.va["hover"]["mouse"] = [];
	this.va["hover"]["mouse"][true] = [];
	this.va["hover"]["mouse"][false] = [];
	this.va["hover"]["mouse"][true]["background-color"] = "skyblue";
	this.va["hover"]["mouse"][true]["opacity"] = "0.5";
	this.va["hover"]["mouse"][false]["background-color"] = "transparent";
	this.va["hover"]["mouse"][false]["opacity"] = "1";
	this.hm = this.va["hover"]["mouse"];
	this.va["hover"]["select"] = [];
	this.va["hover"]["select"][true] = [];
	this.va["hover"]["select"][false] = [];
	this.va["hover"]["select"][true]["background-color"] = "dimgray";
	this.va["hover"]["select"][true]["opacity"] = "1";
	this.va["hover"]["select"][false]["background-color"] = "transparent";
	this.va["hover"]["select"][false]["opacity"] = "1";
	this.hs = this.va["hover"]["select"];
	// tagArray
	this.ta = [];
	this.ta["script"] = [];
	this.ta["css"] = [];
	this.tag = this.ta["script"];
	this.cssTag = this.ta["css"];
	// t = tag, s = selector
	this.setScriptTag = function(tag) {
		this.ta["script"]["t"] = tag;
		this.ta["script"]["s"] = $(tag);
		this.tag = this.ta["script"];
	}
	this.setCSSTag = function(tag) {
		this.ta["css"]["t"] = tag;
		this.ta["css"]["s"] = $(tag);
		this.cssTag = this.ta["css"];
	}
	
	this.initAllValues = function(){
		// valueArray
		this.va["validation"] = false;
		this.va["dropable"] = false;
		this.va["selectedData"] = [];
		this.va["path"] = "";
		this.va["dataDrag"] = false;
		this.va["selectedRow"] = null;
		// tagArray
		this.ta = [];
		this.ta["script"] = [];
		this.ta["css"] = [];
	}
	this.getIconNumId = function(tag) {
		var icon = new Icon();
		return parseInt(tag.id.replace(icon.tagIdRule, ""));
	}
	this.getDataIconNumId = function(tag) {
		var dataIcon = new DataIcon();
		return parseInt(tag.id.replace(dataIcon.tagIdRule, ""));
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