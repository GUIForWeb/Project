guiLib.models.Model = function(){
	this.getIconTdTag = function(x,y) {
		return $("#iconTdX"+x+"Y"+y);
	}
	this.getIconTdTagId = function(x,y){
		return "iconTdX"+x+"Y"+y;
	}
}
	