system.models.Taskmenu = function(){
	this.__proto__ = new Model;
	this.guiName = "";
	this.view = new TaskmenuView(this);
	this.appear = function() {
		
	}
	this.disappear = function() {
		
	}
}