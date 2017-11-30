apps.themes.interfaces.subsystems.TaskbarThemeTrial = function(){
	this.outerLayer = new TaskbarThemeOuterLayerTrial();
	this.outerLayer.__proto__ = this;
	this.switch = function(event) {
		var title = event.target.title;
		var val = event.target.value;
		var flag = false;
		this.taskbarSelector = gui.taskbar.manager.selector;
		this.hOuterSelector = this.taskbarSelector.find(".hideBtOuterLayer");
		if(this.va.iVal[title] != val) {
			flag = true;
			if(!isNaN(val))
				val = parseFloat(val);
			this.va.iVal[title] = val;
		}
		if(flag) {
			switch(title){
				case "tbarOBgColor":
					this.outerLayer.changeBgColor(event);
					break;
				case "tbarOOpacity":
					this.outerLayer.changeOpacity(event);
					break;
				case "tbarOBorderWidth":
					this.outerLayer.changeBorderWidth(event);
					break;
			}
		}
	}	
}