apps.themes.interfaces.controllers.focuses.InterfaceThemeFocusout = function() {
	this.input = function(event) {
		var title = event.target.title
		title = title.substring(0,2);
		sessionStorage.iThemeScrollTop = this.contentSelector.scrollTop();
		switch(title){
			case "wi":
				taskArray.interfaceTheme.wTrial.switch(event);
				break;
			case "ba":
				taskArray.interfaceTheme.bTrial.switch(event);
				break;
			case "tb":
				taskArray.interfaceTheme.tTrial.switch(event);
				break;
			case "cm":
				taskArray.interfaceTheme.cmTrial.switch(event);
				break;
			case "tm":
				taskArray.interfaceTheme.tmTrial.switch(event);
				break;
		}
		this.contentSelector.scrollTop(sessionStorage.iThemeScrollTop);
	}
}