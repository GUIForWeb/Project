apps.themes.interfaces.subsystems.BarThemeTrial = function(){
	this.outlayer = new BarThemeOutlayerTrial();
	this.outlayer.__proto__ = this;
	this.namelayer = new BarThemeNamelayerTrial();
	this.namelayer.__proto__ = this;
	this.switch = function(event) {
		var title = event.target.title;
		var val = event.target.value;
		var flag = false;
		if(this.va.iVal[title] != val) {
			flag = true;
			if(!isNaN(val))
				val = parseFloat(val);
			this.va.iVal[title] = val;
		} 
		if(title.includes("barN")){
			this.nameSelector = this.barSelector.find(".barNameLayer");
		}
		if(flag) {
			switch(title){
				case "barOBgColor":
					this.outlayer.changeBgColor(event);
					break;
				case "barOBorderWidth":
					this.outlayer.changeBorderWidth(event);
					break;
				case "barOWidth":
					this.outlayer.changeWidth(event);
					break;
				case "barOHeight":
					this.outlayer.changeHeight(event);
					break;
				case "barNBgColor":
					this.namelayer.changeBgColor(event);
					break;
			}
		}
	}
}