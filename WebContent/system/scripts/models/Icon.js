system.models.Icon = function(){
	this.__proto__ = new Model;
	this.tagIdRule = "icon";
	this.id = 0;
	this.tagId = "";
	this.iconTypeId = 0;
	this.iconType = "";
	this.name = "";
	this.contentURL = "";
	this.options = [];
	this.isOnlyOne = false;
	this.view = new IconView(this);
	this.init = function(iconJSON){
		this.id = iconJSON.id;
		this.tagId = this.tagIdRule + this.id;
		this.x = iconJSON.x;
		this.y = iconJSON.y;
		this.iconTypeId = iconJSON.typeId;
		this.iconType = iconJSON.type;
		this.name = iconJSON.name;
		this.contentURL = iconJSON.contentURL;
		this.imgURL = iconJSON.imgURL;
		this.json = iconJSON;
	}
	this.appear = function(){
		this.view.init();
		this.selector = this.view.iconSelector;
		this.tag = this.view.iconSelector[0];
		this.getIconTdSelector(this.x,this.y).append(this.selector);
	}
	this.disappear = function(){
		this.selector.remove();
	}
}




