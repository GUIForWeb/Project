apps.themes.interfaces.subsystems.ContextMenuThemeTrial = function(){
	this.outerLayer = new ContextMenuThemeOuterLayerTrial();
	this.outerLayer.__proto__ = this;
	this.listLayer = new ContextMenuThemeListLayerTrial();
	this.listLayer.__proto__ = this;
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
		if(flag) {
			switch(title){
				case "cmenuOBgColor":
					this.outerLayer.changeBgColor(event);
					break;
				case "cmenuOFontFamily":
					this.outerLayer.changeFontFamily(event);
					break;
				case "cmenuOFontSize":
					this.outerLayer.changeFontSize(event);
					break;	
				case "cmenuOBorderRadius":
					this.outerLayer.changeBorderRadius(event);
					break;
				case "cmenuOHeight":
					this.outerLayer.changeHeight(event);
					break;
				case "cmenuOWidth":
					this.outerLayer.changeWidth(event);
					break;
				case "cmenuLColor":
					this.listLayer.changeColor(event);
					break;
				case "cmenuLColorHover":
					this.listLayer.changeColorHover(event);
					break;
				case "cmenuLBgColorHover":
					this.listLayer.changeBgColorHover(event);
					break;
				case "cmenuLBorderRadiusHover":
					this.listLayer.changeBorderRadiusHover(event);
					break;
				case "cmenuLHeight":
					this.listLayer.changeHeight(event);
					break;	
			}
		}
	}
}