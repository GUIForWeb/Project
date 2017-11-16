system.elements.taskbars.subsystems.TaskbarManager = function() {
	this.init = function() {
		var taskbar = new Taskbar();
		taskbar.contextPath = this.contextPath;
		this.taskbarTagId = "taskbar";
		taskbar.tagId = this.taskbarTagId;
		taskbar.sectionSelector = this.sectionSelector;
		taskbar.view.setTaskbarValues(this.taskbarValueArray);
		taskbar.appendTaskbar();
		this.menu = new Taskmenu();
		this.menu.__proto__ = this;
		this.view = taskbar.view;
		this.pad = new DirectionalPad();
		this.pad.subjectName = "bar";
		this.pad.type = Direction.HORIZONTAL;
		this.pad.taskbarSelector = taskbar.selector;
		this.pad.init();
	}
	this.needBarZoneMover = function() {
		var zWidth = this.view.barZoneSelector.width();
		var oWidth = this.view.barZoneOuterSelector.width();
		console.log(zWidth);
		console.log(oWidth);
		if(zWidth > 99)//oWidth)
			this.pad.appear();
		else
			this.pad.disappear();
	}
}