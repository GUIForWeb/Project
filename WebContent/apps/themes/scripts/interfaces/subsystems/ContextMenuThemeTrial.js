apps.themes.interfaces.subsystems.ContextMenuThemeTrial = function(){
	this.outlayer = new ContextMenuThemeOutlayerTrial();
	this.outlayer.__proto__ = this;
	this.contextlayer = new ContextMenuThemeContentlayerTrial();
	this.contextlayer.__proto__ = this;
	this.switch = function(event) {
		console.log(this);
		var title = event.target.title;
		var val = event.target.value;
		var flag = false;
		if(this.va.iVal[title] != val) {
			flag = true;
			if(!isNaN(val))
				val = parseFloat(val);
			this.va.iVal[title] = val;
		}
		if(flag) {
			switch(title){
				case "cmenuOBgColor":
					this.outlayer.changeBgColor(event);
					break;
				case "cmenuOFontFamily":
					this.outlayer.changeFontFamily(event);
					break;
				case "cmenuOBorderRadius":
					this.outlayer.changeBorderRadius(event);
					break;
				case "cmenuOHeight":
					this.outlayer.changeHeight(event);
					break;
				case "cmenuOWidth":
					this.outlayer.changeWidth(event);
					break;
				case "cmenuCColor":
					this.contextlayer.changeColor(event);
					break;
				case "cmenuCColorHover":
					this.contextlayer.changeColorHover(event);
					break;
				case "cmenuCBgColorHover":
					this.contextlayer.changeBgColorHover(event);
					break;
				case "cmenuCBorderRadiusHover":
					this.contextlayer.changeBorderRadiusHover(event);
					break;
				case "cmenuLHeight":
					this.contextlayer.changeHeight(event);
					break;	
			}
		}
	}
}