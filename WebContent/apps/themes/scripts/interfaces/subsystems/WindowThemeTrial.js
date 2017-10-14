apps.themes.interfaces.subsystems.WindowThemeTrial = function(){
	this.button = new WindowThemeButtonTrial();
	this.button.__proto__ = this;
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
		console.log(title);	
		if(flag) {
			if(title.includes("winB")) {
				this.btSelector = this.winSelector.find(".windowButtonLayer");
				this.hBSelector = $(this.btSelector[0]);
				this.fBSelector = $(this.btSelector[1]);
				this.xBSelector = $(this.btSelector[2]);
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
			}
		}
	}	
}