apps.themes.interfaces.subsystems.BarThemeTrial = function(){
	this.outerLayer = new BarThemeOuterLayerTrial();
	this.outerLayer.__proto__ = this;
	this.nameLayer = new BarThemeNameLayerTrial();
	this.nameLayer.__proto__ = this;
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
					this.outerLayer.changeBgColor(event);
					break;
				case "barOBorderWidth":
					this.outerLayer.changeBorderWidth(event);
					break;
				case "barOWidth":
					this.outerLayer.changeWidth(event);
					break;
				case "barOHeight":
					this.outerLayer.changeHeight(event);
					break;
				case "barNBgColor":
					this.nameLayer.changeBgColor(event);
					break;
			}
		}
	}
}