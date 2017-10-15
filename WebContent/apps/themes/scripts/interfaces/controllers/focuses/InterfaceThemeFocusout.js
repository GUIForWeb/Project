apps.themes.interfaces.controllers.focuses.InterfaceThemeFocusout = function() {
	this.input = function(event) {
		var title = event.target.title
		title = title.substring(0,1);
		sessionStorage.iThemeScrollTop = this.contentSelector.scrollTop();
		switch(title){
			case "w":
				taskArray.interfaceTheme.wTrial.switch(event);
				break;
			case "b":
				taskArray.interfaceTheme.bTrial.switch(event);
				break;
			case "t":
				taskArray.interfaceTheme.tTrial.switch(event);
				break;
			case "c":
				taskArray.interfaceTheme.cTrial.switch(event);
				break;
		}
		this.contentSelector.scrollTop(sessionStorage.iThemeScrollTop);
	}
}