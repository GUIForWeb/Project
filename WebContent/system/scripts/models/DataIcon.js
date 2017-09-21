guiLib.models.DataIcon = function(){
	this.__proto__ = new Model;
	this.guiName = "";
	this.tagIdRule = "icon";
	this.tagClass = "iconDiv";
	this.imgClass = "iconImg";
	this.id = null;
	this.tagId = null;
	this.view = new IconView(this);
	this.init = function(dataJSON){
		this.name = dataJSON.name;
		this.dateModified = dataJSON.dateModified;
		this.size = dataJSON.size;
		this.type = dataJSON.type;
		this.x = dataJSON.x;
		this.y = dataJSON.y;
		//this.imgURL = "/WebGUI/system/comps/icons/"+this.type.replaces("/","_")+".png";
		/*
		this.id = json.id;
		this.tagId = this.tagIdRule + this.id;
		this.x = json.x;
		this.y = json.y;
		
		this.iconURL = "/WebGUI/system/comps/icons/file.png";
		*/
	}
	this.appendIcon = function(){
		this.selector = this.view.iconSelector;
		this.tag = this.view.iconSelector[0];
		this.getIconTdSelector(this.x,this.y).append(this.selector);
	}
}




