system.desktops.subsystems.DesktopController = function() {
	console.log("dc");
	// valueArray
	this.va = [];
	this.va["validation"] = false;
	this.va["dropable"] = false;
	this.va["selectedData"] = [];
	this.va["path"] = "";
	this.va["data"] = [];
	this.va["dataDrag"] = false;
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
}