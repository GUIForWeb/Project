guiLib.models.Taskbar = function(){
	this.__proto__ = new Model;
	this.guiName = "";
	this.tagIdRule = "taskbar";
	this.guiId = 0;
	this.numId = 0;
	this.tagId = "taskbar";
	this.view = new TaskbarView(this);
	this.appendTaskbar = function(){
		this.view.getView();
		this.bgSelector.append(this.view.taskbarSelector);
	}
	this.init = function(numId){
		this.numId = numId;
		this.tagId = this.tagIdRule + numId;
		this.zIndex = numId;
	}
}