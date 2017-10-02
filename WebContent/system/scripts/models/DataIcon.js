system.models.DataIcon = function(){
	this.__proto__ = new Model;
	this.guiName = "";
	this.tagIdRule = "dataIcon";
	this.id = null;
	this.tagId = null;
	this.view = new DataIconView(this);
	this.view.tagClass = "iconDiv dataIcon";
	this.init = function(dataJSON){
		this.id = dataJSON.id;
		this.tagId = this.tagIdRule + this.id;
		this.name = dataJSON.name;
		this.dateModified = dataJSON.dateModified;
		this.size = dataJSON.size;
		this.type = dataJSON.type;
		this.x = dataJSON.x;
		this.y = dataJSON.y;
		this.imgURL = "/system/comps/icons/"+this.type.replace("/","_")+".png";
		this.json = dataJSON;
	}
	this.appear = function(){
		this.view.getView();
		this.selector = this.view.iconSelector;
		this.tag = this.view.iconSelector[0];
		this.getIconTdSelector(this.x,this.y).append(this.selector);
	}
	this.disappear = function(){
		this.selector.remove();
	}
}




