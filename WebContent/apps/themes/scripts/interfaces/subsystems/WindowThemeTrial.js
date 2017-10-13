apps.themes.interfaces.subsystems.WindowThemeTrial = function(){
	this.button = new WindowThemeButtonTrial();
	this.button.__proto__ = this;
	this.switch = function(event) {
		var title = event.target.title;
		switch(title){
			case "winBBorderWidth":
				this.button.borderWidth(event);
				break;
		}
	}	
}