function Controller(){
	//valueArray
	this.va = [];
	this.va["clipboard"] = [];
	//tagArray
	this.ta = [];
	this.ta["script"] = [];
	this.ta["css"] = [];
	this.setScriptTag = function(tag){
		this.ta["script"]["html"] = tag;
		this.ta["script"]["jQuery"] = $(tag);
	}
	this.setCSSTag = function(tag){
		this.ta["css"]["html"] = tag;
		this.ta["css"]["jQuery"] = $(tag);
	}
	this.tag = this.ta["script"];
	this.cssTag = this.ta["css"];
}

