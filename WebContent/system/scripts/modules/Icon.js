function Icon(){
	this.__proto__ = new Model;
	this.guiName = "";
	this.tagIdRule = "icon";
	this.tagClass = "iconDiv";
	this.imgClass = "iconImg";
	this.guiId = 0;
	this.numId = 0;
	this.tagId = "";
	this.iconX = 0;
	this.iconY = 0;
	this.iconTypeId = 0;
	this.iconType = "";
	this.img = "";
	this.name = "";
	this.contentURL = "";
	this.view = new IconView(this);
	this.init = function(iconMap){
		this.numId = iconMap["iconNumId"];
		this.tagId = this.tagIdRule + this.numId;
		this.iconX = iconMap["iconX"];
		this.iconY = iconMap["iconY"];
		this.iconTypeId = iconMap["iconTypeId"];
		this.iconType = iconMap["iconType"];
		this.name = iconMap["name"];
		this.contentURL = iconMap["contentURL"];
		this.iconURL = iconMap["iconURL"];
	}
	this.appendIcon = function(){
		this.tableWrapTag.append(this.view.outerTag);
		var offset = this.getIconTdTag(this.iconX,this.iconY).offset();
		this.view.iconOLeft = offset.left + (this.view.iconTdBorderWidth/2);
		this.view.iconOTop = offset.top + (this.view.iconTdBorderHeight/2);
		this.view.iconTag.offset({
			left: this.view.iconOLeft,
			top: this.view.iconOTop
		});
		this.tag = this.view.outerTag;
	}
}




