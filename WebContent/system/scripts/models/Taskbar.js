system.models.Taskbar = function(){
	this.__proto__ = new Model;
	this.tagIdRule = "taskbar";
	this.tagId = "taskbar";
	this.view = new TaskbarView(this);
	this.appear = function(){
		this.view.init();
		this.sectionSelector.append(this.view.taskbarSelector);
		this.selector = this.view.taskbarSelector;
	}
	this.init = function(numId){
		this.numId = numId;
		this.tagId = this.tagIdRule + numId;
		this.zIndex = numId;
	}
}