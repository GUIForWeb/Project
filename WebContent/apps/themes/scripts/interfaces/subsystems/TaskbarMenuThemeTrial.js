apps.themes.interfaces.subsystems.TaskbarMenuThemeTrial = function(){
	this.outerLayer = new TaskbarMenuThemeOuterLayerTrial();
	this.outerLayer.__proto__ = this;
	this.listLayer = new TaskbarMenuThemeListLayerTrial();
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
			console.log(title);
			switch(title){
				case "tmenuOWidth":
					this.outerLayer.changeWidth(event);
					break;
				case "tmenuOBgColor":
					this.outerLayer.changeBgColor(event);
					break;
				case "tmenuOFontSize":
					this.outerLayer.changeFontSize(event);
					break;
				case "tmenuOFontFamily":
					this.outerLayer.changeFontFamily(event);
					break;
				case "tmenuLHeight":
					this.listLayer.changeHeight(event);
					break;
				case "tmenuLBgColorHover":
					this.listLayer.changeBgColorHover(event);
					break;	
				case "tmenuLColorHover":
					this.listLayer.changeColorHover(event);
					break;	
				case "tmenuLBorderRadiusHover":
					this.listLayer.changeBorderRadiusHover(event);
					break;	
			}
		}
	}
}