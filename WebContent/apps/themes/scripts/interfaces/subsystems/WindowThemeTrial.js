apps.themes.interfaces.subsystems.WindowThemeTrial = function(){
	this.button = new WindowThemeButtonTrial();
	this.button.__proto__ = this;
	this.outerLayer = new WindowThemeOuterLayerTrial();
	this.outerLayer.__proto__ = this;
	this.headLayer = new WindowThemeHeadLayerTrial();
	this.headLayer.__proto__ = this;
	this.contentLayer = new WindowThemeContentLayerTrial();
	this.contentLayer.__proto__ = this;
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
			if(title.includes("winB")) {
				this.btSelector = this.winSelector.find(".windowButtonLayer");
				this.hBSelector = $(this.btSelector[0]);
				this.fBSelector = $(this.btSelector[1]);
				this.xBSelector = $(this.btSelector[2]);
			}
			else if(title.includes("winH")) {
				this.headSelector = this.winSelector.find(".windowHeadLayer");
			}
			switch(title){
				case "winBBorderWidth":
					this.button.changeBorderWidth(event);
					break;
				case "winBBorderColor":
					this.button.changeBorderColor(event);
					break;
				case "winBBgColor":
					this.button.changeBgColor(event);
					break;
				case "winBWidth":
					this.button.changeWidth(event);
					break;	
				case "winBHeight":
					this.button.changeHeight(event);
					break;
				case "winBTop":
					this.button.changeTop(event);
					break;
				case "winOBorderWidth":
					this.outerLayer.changeBorderWidth(event);
					break;
				case "winOBgColor":
					this.outerLayer.changeBgColor(event);
					break;
				case "winHBgColor":
					this.headLayer.changeBgColor(event);
					break;	
				case "winHHeight":
					this.headLayer.changeHeight(event);
					break;
				case "winMinWidth":
					this.outlayer.changeMinWidth(event);
					break;
				case "winMinHeight":
					this.outlayer.changeMinHeight(event);
					break;
				case "winCBgColor":
					this.contentLayer.changeBgColor(event);
					break;
				case "winHFontFamily":
					this.headLayer.changeFontFamily(event);
					break;	
			}
		}
	}
	this.setChangedInputValues = function() {
		var val = null;
		for(ii=0; ii<this.inputs.length; ii++){
			this.inputs[ii].value = this.va.iVal[this.inputs[ii].title];
		}
		this.controller.va.iVal = this.va.iVal; 
	}
}