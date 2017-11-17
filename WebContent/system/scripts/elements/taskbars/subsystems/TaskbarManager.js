system.elements.taskbars.subsystems.TaskbarManager = function() {
	this.init = function() {
		var taskbar = new Taskbar();
		taskbar.contextPath = this.contextPath;
		this.taskbarTagId = "taskbar";
		taskbar.tagId = this.taskbarTagId;
		taskbar.sectionSelector = this.sectionSelector;
		taskbar.view.setTaskbarValues(this.taskbarValueArray);
		taskbar.appear();
		this.view = taskbar.view;
		this.menu = new Taskmenu();
		this.menu.setTaskbarSelector(taskbar.selector);
		this.menu.init();
		this.dPad = new DirectionalPad();
		this.dPad.subjectName = "bar";
		this.dPad.type = Direction.HORIZONTAL;
		this.dPad.setTaskbarSelector(taskbar.selector);
		this.dPad.init();
		this.dPad.setLeftKeyClick("gui.taskbar.click.leftKey()");
		this.dPad.setRigthKeyClick("gui.taskbar.click.rightKey()");
		this.taskbar.controller.barZoneSelector = this.taskbar.manager.view.barZoneSelector;
		this.taskbar.controller.barZoneOuterSelector = this.taskbar.manager.view.barZoneOuterSelector;
	}
	this.needBarZoneMover = function() {
		var zWidth = this.view.barZoneSelector.width();
		var oWidth = this.view.barZoneOuterSelector.width();
		var bzoLeft = this.view.barZoneOuterSelector.offset().left;
		if(zWidth > oWidth) {
			this.dPad.appear();
		}
		else {
			this.dPad.disappear();
			this.view.barZoneSelector.offset(
				{left: bzoLeft}
			);
		}
	}
}