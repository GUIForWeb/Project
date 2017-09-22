system.models.Model = function(){
	this.getIconTdSelector = function(x,y) {
		return $("#iconTdX"+x+"Y"+y);
	}
	this.getIconTdTagId = function(x,y){
		return "iconTdX"+x+"Y"+y;
	}
}
	