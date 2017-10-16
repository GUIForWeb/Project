apps.themes.interfaces.subsystems.TaskbarThemeTrial = function(){
	this.outlayer = new TaskbarThemeOutlayerTrial();
	this.outlayer.__proto__ = this;
	this.switch = function(event) {
		var title = event.target.title;
		var val = event.target.value;
		var flag = false;
		this.taskbarSelector = gui.taskbarSelector;
		this.lOuterSelector = this.taskbarSelector.find(".logoutOuterLayer");
		if(this.va.iVal[title] != val) {
			flag = true;
			if(!isNaN(val))
				val = parseFloat(val);
			this.va.iVal[title] = val;
		}
		if(flag) {
			switch(title){
				case "tbarOBgColor":
					this.outlayer.changeBgColor(event);
					break;
				case "tbarOOpacity":
					this.outlayer.changeOpacity(event);
					break;
				case "tbarOBorderWidth":
					this.outlayer.changeBorderWidth(event);
					break;
			}
		}
	}	
}