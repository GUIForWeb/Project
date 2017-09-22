fileBrowser.controllers.Controller = function() {
	// valueArray
	this.va = [];
	this.va["clipboard"] = [];
	this.va["validation"] = false;
	this.va["dropable"] = false;
	this.va["selectedData"] = [];
	this.va["path"] = "";
	this.va["isData"] = "";
	this.va["data"] = [];
	// tagArray
	this.ta = [];
	this.ta["script"] = [];
	this.ta["css"] = [];
	// t = tag, s = selector
	this.setScriptTag = function(tag) {
		this.ta["script"]["t"] = tag;
		this.ta["script"]["s"] = $(tag);
	}
	this.setCSSTag = function(tag) {
		this.ta["css"]["t"] = tag;
		this.ta["css"]["s"] = $(tag);
	}
	this.tag = this.ta["script"];
	this.cssTag = this.ta["css"];
}
